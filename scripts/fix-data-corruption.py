#!/usr/bin/env python3
"""Fix known data corruptions in src/data/courses.ts and src/data/hydrodynamics.ts.

Corruption classes fixed (all inside string literals only, code untouched):
  A. Raw control bytes left by a bad conversion: 0x07 where \\approx belongs,
     0x08 where \\bar belongs, 0x0C where \\frac belongs.
  B. Lone single-backslash LaTeX commands inside $...$ / $$...$$ math segments
     (JS string escapes ate them: \\f -> formfeed, \\b -> backspace,
     \\mathbf -> "mathbf", \\alpha -> "alpha", ...). Doubled to \\\\ so the
     runtime string carries the backslash again.
  C. "'+'" inside math segments (a quoted plus) -> "+" (it made KaTeX report
     "Double superscript" after x^2 etc.).
  D. Two aligned blocks with two \\tag commands (KaTeX allows one per block):
     both tags removed (nothing in the text references (1) or (2)).
  E. Six PYQYear entries missing `session` (course page renders session as the
     card title, so the cards came out title-less). Session set to the year
     string verbatim.
  F. Hydrodynamics 2024-2025 session mislabeled "... - Math-4105" (Math-4105
     is Topology's code; the year's questions are hydrodynamics). Suffix cut.
  G. Duplicate course id "hydrodynamics" (4101 course and the notes course):
     the notes course (hydrodynamics.ts) renamed to "hydrodynamics-notes" so
     its homepage card no longer links to the 4101 page.

Usage: python3 scripts/fix-data-corruption.py  (prints counts, rewrites files)
"""
import re
import sys

COURSES = 'src/data/courses.ts'
HYDRO = 'src/data/hydrodynamics.ts'

# NOTE on the byte replacements: the file must end up containing TWO backslash
# characters followed by the letter, because the surrounding text is a JS
# template literal / double-quoted string where \\ renders as one backslash.
# b'\\\\a' in this source is exactly: backslash, backslash, a.
CTRL = [
    (b'\x07', b'\\\\a'),
    (b'\x08', b'\\\\b'),
    (b'\x0c', b'\\\\f'),
]


def fix_math_segment(body, stats):
    """Fix one math segment body (file-text form)."""
    before = body
    n_plus = body.count("'+'")
    body = body.replace("'+'", '+')
    stats['plus'] += n_plus
    # Double every lone backslash (not part of an existing pair).
    body, n_bs = re.subn(r'(?<!\\)\\(?!\\)', r'\\\\', body)
    stats['backslash'] += n_bs
    if body != before:
        stats['segments_touched'] += 1
    return body


def fix_literal_content(content, stats):
    """Apply math-segment fixes inside one string literal's content."""
    # Display math first, then inline math on the remainder.
    def disp(m):
        return '$$' + fix_math_segment(m.group(1), stats) + '$$'

    out = re.sub(r'\$\$([\s\S]+?)\$\$', disp, content)

    def inl(m):
        return '$' + fix_math_segment(m.group(1), stats) + '$'

    out = re.sub(r'(?<!\$)\$(?!\$)([^$]+?)\$', inl, out)
    return out


def fix_literals(text, stats):
    """Walk the file, transforming only double-quoted and template literals."""
    assert '${' not in text, 'unexpected ${} interpolation in data file'
    res = []
    i, n = 0, len(text)
    while i < n:
        ch = text[i]
        if ch == '"' or ch == '`':
            quote = ch
            j = i + 1
            buf = []
            while j < n:
                c = text[j]
                if c == '\\' and j + 1 < n:
                    buf.append(text[j:j + 2])
                    j += 2
                    continue
                if c == quote:
                    break
                buf.append(c)
                j += 1
            else:
                raise SystemExit(f'unterminated literal starting at offset {i}')
            content = ''.join(buf)
            res.append(quote + fix_literal_content(content, stats) + quote)
            stats['literals'] += 1
            i = j + 1
        else:
            res.append(ch)
            i += 1
    return ''.join(res)


def add_missing_sessions(text):
    """Insert session lines for the six session-less years (bottom-up)."""
    lines = text.split('\n')
    # (1-based line number, expected year value)
    targets = [
        (2339, '2018-2019'),
        (3488, '2022-2023'),
        (5757, '2017-2018 (Special)'),
        (6399, '2019-2020'),
        (6994, '2020-2021'),
        (7625, '2024-2025(22)'),
    ]
    for lineno, year in reversed(targets):
        line = lines[lineno - 1]
        assert f'year: "{year}"' in line, f'line {lineno} is not year {year}: {line!r}'
        assert 'session:' not in lines[lineno], f'line {lineno} already has session'
        indent = line[:len(line) - len(line.lstrip())]
        lines.insert(lineno, f'{indent}session: "{year}",')
    return '\n'.join(lines)


def fix_tags(text):
    """Remove both \\tag tokens from display blocks that contain two of them.

    KaTeX allows a single \\tag per math block. Lone \\tag{2} blocks (a
    solution that just numbers one equation (2)) are valid and must stay.
    Only the two aligned systems that carry both \\tag{1} and \\tag{2} fail.
    """
    lines = text.split('\n')
    tag2 = [i for i, ln in enumerate(lines) if '\\\\tag{2}' in ln]
    fixed = 0
    for i in tag2:
        # Walk back to the start of this display block ($$ line).
        j = i
        tag1_line = None
        while j >= 0 and '$$' not in lines[j]:
            if '\\\\tag{1}' in lines[j]:
                tag1_line = j
            j -= 1
        if tag1_line is None:
            continue  # lone tag{2}: valid, keep it
        lines[i] = lines[i].replace(' \\\\tag{2}', '', 1)
        lines[tag1_line] = lines[tag1_line].replace(' \\\\tag{1}', '', 1)
        fixed += 1
    assert fixed == 2, f'expected 2 double-tag blocks, fixed {fixed}'
    return '\n'.join(lines)


def main():
    total = {'literals': 0, 'segments_touched': 0, 'plus': 0, 'backslash': 0}
    for path in (COURSES, HYDRO):
        raw = open(path, 'rb').read()
        ctrl_counts = {}
        for bad, good in CTRL:
            ctrl_counts[bad] = raw.count(bad)
            raw = raw.replace(bad, good)
        text = raw.decode('utf-8')
        stats = {'literals': 0, 'segments_touched': 0, 'plus': 0, 'backslash': 0}
        text = fix_literals(text, stats)
        if path == COURSES:
            text = fix_tags(text)
            text = add_missing_sessions(text)
            n_label = text.count(' - Math-4105"')
            text = text.replace('session: "2024-2025 (Term I) - Math-4105"',
                                'session: "2024-2025 (Term I)"')
            assert n_label == 1, f'Math-4105 label occurrences: {n_label}'
        else:
            n_id = text.count('id: "hydrodynamics",')
            text = text.replace('id: "hydrodynamics",', 'id: "hydrodynamics-notes",')
            assert n_id == 1, f'hydrodynamics id occurrences: {n_id}'
        open(path, 'w', encoding='utf-8', newline='').write(text)
        print(f'{path}: control bytes fixed={ctrl_counts}, '
              f'literals={stats["literals"]}, math segments touched={stats["segments_touched"]}, '
              f"'+'->+ : {stats['plus']}, lone backslashes doubled={stats['backslash']}")
        for k in total:
            total[k] += stats[k]
    print('TOTAL:', total)


if __name__ == '__main__':
    main()
