import bpy

def analyze_scene():

    scene = bpy.context.scene

    obj_count = len(scene.objects)

    poly_count = 0
    light_count = 0

    for obj in scene.objects:
        if obj.type == 'MESH':
            poly_count += len(obj.data.polygons)
        elif obj.type == 'LIGHT':
            light_count += 1

    return {
        "object_count": obj_count,
        "poly_count": poly_count,
        "light_count": light_count,
        "animation": scene.frame_end > scene.frame_start
    }