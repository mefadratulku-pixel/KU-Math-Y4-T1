import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import os

def draw_modeling_stages():
    # Ensure the directory exists
    os.makedirs('public/assets/math-modeling', exist_ok=True)
    
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.axis('off')
    
    # Define box properties
    box_props = dict(boxstyle="round,pad=0.5", fc="#e0f2fe", ec="#0284c7", lw=2)
    text_props = dict(ha='center', va='center', fontsize=12, fontweight='bold', color="#0f172a")
    
    # Coordinates for boxes
    coords = {
        'Real World Problem': (0.5, 0.9),
        'Mathematical Model': (0.5, 0.65),
        'Mathematical Solution': (0.5, 0.4),
        'Interpretation': (0.5, 0.15)
    }
    
    # Draw boxes
    for text, (x, y) in coords.items():
        ax.text(x, y, text, bbox=box_props, **text_props)
        
    # Draw arrows
    arrow_props = dict(arrowstyle="->", color="#334155", lw=2)
    
    ax.annotate('', xy=(0.5, 0.72), xytext=(0.5, 0.85), arrowprops=dict(**arrow_props, label="Formulation"))
    ax.annotate('', xy=(0.5, 0.47), xytext=(0.5, 0.58), arrowprops=dict(**arrow_props, label="Solve"))
    ax.annotate('', xy=(0.5, 0.22), xytext=(0.5, 0.33), arrowprops=dict(**arrow_props, label="Interpret"))
    
    # Add text labels to arrows
    ax.text(0.52, 0.78, 'Formulation', fontsize=10, va='center', color="#475569")
    ax.text(0.52, 0.53, 'Solve (Analytical/Numerical)', fontsize=10, va='center', color="#475569")
    ax.text(0.52, 0.28, 'Interpret Results', fontsize=10, va='center', color="#475569")
    
    # Validation loop (arrow from Interpretation back to Formulation)
    ax.annotate('', xy=(0.7, 0.65), xytext=(0.7, 0.15), 
                arrowprops=dict(arrowstyle="->", color="#b91c1c", lw=2, connectionstyle="angle,angleA=0,angleB=90,rad=10"))
    ax.annotate('', xy=(0.65, 0.65), xytext=(0.7, 0.65), 
                arrowprops=dict(arrowstyle="->", color="#b91c1c", lw=2))
    ax.text(0.72, 0.4, 'Validation (Modify model if needed)', fontsize=10, va='center', rotation=-90, color="#b91c1c")

    plt.title("Stages of Mathematical Modeling", fontsize=16, fontweight='bold', color="#1e293b", pad=20)
    plt.tight_layout()
    plt.savefig('public/assets/math-modeling/stages-diagram.png', dpi=300, bbox_inches='tight', transparent=True)
    print("Successfully generated stages-diagram.png")

if __name__ == "__main__":
    draw_modeling_stages()
