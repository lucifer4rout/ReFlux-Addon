import bpy
from .system import get_system_info
from .analyzer import analyze_scene
from .presets import PRESETS
from .adaptive import adaptive_sample_target


class RENDER_OT_optimize_settings(bpy.types.Operator):
    bl_idname = "render.optimize_settings"
    bl_label = "Optimize Render Settings"

    def execute(self, context):

        scene = context.scene
        cycles = scene.cycles
        view_layer = context.view_layer
        mode = scene.render_optimizer_mode

        sys_info = get_system_info()
        scene_info = analyze_scene()

        # -------------------------
        # BASE SAMPLES
        # -------------------------
        base = 64 if mode == "FAST" else 128 if mode == "BALANCED" else 256
        base *= PRESETS[mode]

        if scene.use_adaptive_sampling:
            cycles.samples = adaptive_sample_target(scene, scene_info, base)
        else:
            cycles.samples = int(base)

        # -------------------------
        # ENGINE FIX
        # -------------------------
        scene.render.engine = scene.render_engine_mode

        if scene.render.engine == 'CYCLES':
            cycles.device = scene.cycles_device_mode

        elif scene.render.engine == 'BLENDER_EEVEE':
            scene.eevee.taa_render_samples = 64

        # -------------------------
        # SETTINGS
        # -------------------------
        scene.render.use_motion_blur = scene.use_motion_blur_opt

        if scene.use_light_opt and scene.render.engine == 'CYCLES':
            cycles.max_bounces = 3 if mode == 'FAST' else 6 if mode == 'BALANCED' else 8

        try:
            view_layer.cycles.use_denoising = scene.use_denoise_opt
        except:
            pass

        cycles.use_adaptive_sampling = scene.use_performance_opt
        cycles.adaptive_threshold = 0.15

        scene.render.use_simplify = (mode == 'FAST')

        # -------------------------
        # COLOR FIX (WORKS NOW)
        # -------------------------
        view = scene.view_settings
        display = scene.display_settings

        display.display_device = 'sRGB'

        preset = scene.color_preset_mode

        if preset == 'REALISTIC':
            view.view_transform = 'Filmic'
            view.look = 'None'
            view.exposure = 0

        elif preset == 'CINEMATIC':
            view.view_transform = 'Filmic'
            view.look = 'Medium High Contrast'
            view.exposure = -0.3

        elif preset == 'OLD':
            view.view_transform = 'Standard'
            view.look = 'None'
            view.exposure = 0.2

        elif preset == 'NEON':
            view.view_transform = 'Filmic'
            view.look = 'High Contrast'
            view.exposure = 0.5

        elif preset == 'FLAT':
            view.view_transform = 'Standard'
            view.look = 'None'
            view.exposure = 0

        # -------------------------
        # TIME LIMIT FIX
        # -------------------------
        frames = scene.frame_end - scene.frame_start + 1

        if mode in {'FAST', 'BALANCED'}:
            time_per_frame = 30
            cycles.samples = min(cycles.samples, 96)
        else:
            time_per_frame = cycles.samples * 0.05 * 2.2

        self.report({'INFO'},
            f"{mode} | samples {cycles.samples} | {time_per_frame:.1f}s/frame"
        )

        return {'FINISHED'}


class RENDER_OT_preview_render(bpy.types.Operator):
    bl_idname = "render.preview_render"
    bl_label = "Preview Render"

    def execute(self, context):
        context.scene.cycles.samples = 16
        bpy.ops.render.render('INVOKE_DEFAULT')
        return {'FINISHED'}


class RENDER_OT_final_render(bpy.types.Operator):
    bl_idname = "render.final_render"
    bl_label = "Final Render"

    def execute(self, context):
        bpy.ops.render.optimize_settings()
        bpy.ops.render.render('INVOKE_DEFAULT')
        return {'FINISHED'}