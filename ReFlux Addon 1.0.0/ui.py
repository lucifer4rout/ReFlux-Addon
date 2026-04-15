import bpy
from .system import get_system_info
from .analyzer import analyze_scene


class RenderOptimizerPanel(bpy.types.Panel):
    bl_label = "ReFlux Optimizer"
    bl_idname = "RENDER_PT_optimizer"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "Optimizer"

    def draw(self, context):

        layout = self.layout
        scene = context.scene
        cycles = scene.cycles

        # -------------------------
        # SAFE DATA FETCH
        # -------------------------
        try:
            sys_info = get_system_info()
        except:
            sys_info = {
                "gpu_name": "Unknown",
                "vram": 0,
                "gpu_backend": "Unknown",
                "cpu_cores": 0,
                "gpu_score": 0
            }

        try:
            scene_info = analyze_scene()
        except:
            scene_info = {
                "object_count": 0,
                "poly_count": 0,
                "light_count": 0
            }

        # -------------------------
        # MAIN CONTROLS
        # -------------------------
        box = layout.box()
        box.label(text="⚙ Render Settings")

        box.prop(scene, "render_optimizer_mode")
        box.prop(scene, "render_engine_mode")

        if scene.render_engine_mode == 'CYCLES':
            box.prop(scene, "cycles_device_mode")

        box.prop(scene, "color_preset_mode")

        # -------------------------
        # TOGGLES
        # -------------------------
        box = layout.box()
        box.label(text="🔧 Optimizations")

        box.prop(scene, "use_adaptive_sampling")
        box.prop(scene, "use_motion_blur_opt")
        box.prop(scene, "use_light_opt")
        box.prop(scene, "use_denoise_opt")
        box.prop(scene, "use_performance_opt")

        # -------------------------
        # STATS
        # -------------------------
        box = layout.box()
        box.label(text="📊 Stats")

        box.label(text=f"Samples: {getattr(cycles, 'samples', 0)}")
        box.label(text=f"Light Bounces: {getattr(cycles, 'max_bounces', 0)}")

        # -------------------------
        # SYSTEM SPECS
        # -------------------------
        box = layout.box()
        box.label(text="💻 System Specs")

        gpu_name = sys_info.get("gpu_name", "Unknown")
        vram = sys_info.get("vram", 0)
        backend = sys_info.get("gpu_backend", "Unknown")
        cpu = sys_info.get("cpu_cores", 0)
        score = sys_info.get("gpu_score", 0)

        box.label(text=f"GPU: {gpu_name}")
        box.label(text=f"VRAM: {vram} GB")
        box.label(text=f"Backend: {backend}")
        box.label(text=f"CPU Cores: {cpu}")
        box.label(text=f"GPU Score: {score}")

        # -------------------------
        # 🔥 NEW: SYSTEM CATEGORY (ADDED ONLY)
        # -------------------------
        system_power = (
            score +
            (cpu * 10) +
            (vram * 5)
        )

        if system_power < 120:
            system_type = "🟥 LOW END SYSTEM"
        elif system_power < 300:
            system_type = "🟨 MID RANGE SYSTEM"
        else:
            system_type = "🟩 HIGH END SYSTEM"

        box.label(text=f"System Type: {system_type}")

        # -------------------------
        # SCENE INFO
        # -------------------------
        box = layout.box()
        box.label(text="🎬 Scene Info")

        obj = scene_info.get("object_count", 0)
        poly = scene_info.get("poly_count", 0)
        lights = scene_info.get("light_count", 0)

        box.label(text=f"Objects: {obj}")
        box.label(text=f"Polys: {poly}")
        box.label(text=f"Lights: {lights}")

        # -------------------------
        # COMPLEXITY METER
        # -------------------------
        complexity = (
            obj * 0.2 +
            poly * 0.0001 +
            lights * 2
        )

        if complexity < 80:
            level = "LOW"
        elif complexity < 200:
            level = "MEDIUM"
        else:
            level = "HIGH"

        box = layout.box()
        box.label(text="📈 Scene Complexity")

        box.label(text=f"Score: {complexity:.1f}")
        box.label(text=f"Level: {level}")

        bar = "█" * int(min(complexity / 10, 10))
        box.label(text=f"[{bar}]")

        # -------------------------
        # ACTIONS
        # -------------------------
        box = layout.box()
        box.label(text="🎮 Actions")

        box.operator("render.preview_render")
        box.operator("render.final_render")

        layout.operator("render.optimize_settings")