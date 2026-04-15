def adaptive_sample_target(scene, scene_info, base_samples):

    complexity = (
        scene_info["object_count"] * 0.2 +
        scene_info["poly_count"] * 0.0001 +
        scene_info["light_count"] * 2
    )

    if complexity < 80:
        multiplier = 0.6
    elif complexity < 200:
        multiplier = 1.0
    else:
        multiplier = 1.4

    if scene.frame_end > scene.frame_start:
        multiplier *= 1.2

    return max(16, min(int(base_samples * multiplier), 512))