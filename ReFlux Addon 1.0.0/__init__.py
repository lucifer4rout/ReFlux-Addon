import bpy
from .optimizer import (
    RENDER_OT_optimize_settings,
    RENDER_OT_preview_render,
    RENDER_OT_final_render,
)
from .ui import RenderOptimizerPanel


classes = (
    RENDER_OT_optimize_settings,
    RENDER_OT_preview_render,
    RENDER_OT_final_render,
    RenderOptimizerPanel,
)


def register():

    for c in classes:
        bpy.utils.register_class(c)

    bpy.types.Scene.render_optimizer_mode = bpy.props.EnumProperty(
        name="Mode",
        items=[
            ('FAST', "Fast", ""),
            ('BALANCED', "Balanced", ""),
            ('QUALITY', "Quality", "")
        ],
        default='BALANCED'
    )

    bpy.types.Scene.render_engine_mode = bpy.props.EnumProperty(
        name="Engine",
        items=[
            ('CYCLES', "Cycles", ""),
            ('BLENDER_EEVEE', "Eevee", ""),
            ('BLENDER_WORKBENCH', "Workbench", "")
        ],
        default='CYCLES'
    )

    bpy.types.Scene.cycles_device_mode = bpy.props.EnumProperty(
        name="Device",
        items=[
            ('CPU', "CPU", ""),
            ('GPU', "GPU Compute", "")
        ],
        default='GPU'
    )

    bpy.types.Scene.color_preset_mode = bpy.props.EnumProperty(
        name="Color Preset",
        items=[
            ('REALISTIC', "Realistic", ""),
            ('CINEMATIC', "Cinematic", ""),
            ('OLD', "Old Film", ""),
            ('NEON', "Neon", ""),
            ('FLAT', "Flat", "")
        ],
        default='REALISTIC'
    )

    bpy.types.Scene.use_motion_blur_opt = bpy.props.BoolProperty(default=True)
    bpy.types.Scene.use_light_opt = bpy.props.BoolProperty(default=True)
    bpy.types.Scene.use_denoise_opt = bpy.props.BoolProperty(default=True)
    bpy.types.Scene.use_performance_opt = bpy.props.BoolProperty(default=True)
    bpy.types.Scene.use_adaptive_sampling = bpy.props.BoolProperty(default=True)


def unregister():

    props = [
        "render_optimizer_mode",
        "render_engine_mode",
        "cycles_device_mode",
        "color_preset_mode",
        "use_motion_blur_opt",
        "use_light_opt",
        "use_denoise_opt",
        "use_performance_opt",
        "use_adaptive_sampling"
    ]

    for p in props:
        delattr(bpy.types.Scene, p)

    for c in reversed(classes):
        bpy.utils.unregister_class(c)