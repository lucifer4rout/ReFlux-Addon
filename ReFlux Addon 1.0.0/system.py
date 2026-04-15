import os
import bpy


def get_system_info():

    gpu_name, backend = get_gpu_info()

    return {
        "cpu_cores": os.cpu_count() or 0,
        "gpu_name": gpu_name,
        "gpu_backend": backend,
        "vram": estimate_vram(gpu_name),
        "gpu_score": get_gpu_score(gpu_name)
    }


# -------------------------
# GPU DETECTION (FIXED PROPERLY)
# -------------------------
def get_gpu_info():

    try:
        prefs = bpy.context.preferences.addons['cycles'].preferences
        prefs.get_devices()

        # IMPORTANT: ensure backend exists
        backend = getattr(prefs, "compute_device_type", "NONE")

        gpu = None

        # 1. active device first
        for d in prefs.devices:
            if d.type != 'CPU' and d.use:
                gpu = d.name
                break

        # 2. fallback any GPU
        if gpu is None:
            for d in prefs.devices:
                if d.type != 'CPU':
                    gpu = d.name
                    break

        if gpu is None:
            gpu = "CPU"

        return gpu, backend

    except:
        return "CPU", "UNKNOWN"


# -------------------------
# VRAM ESTIMATION (SAFE)
# -------------------------
def estimate_vram(name):

    name = str(name).lower()

    if "cpu" in name:
        return 0

    if "4090" in name: return 24
    if "4080" in name: return 16
    if "4070" in name: return 12
    if "3090" in name: return 24
    if "3080" in name: return 10
    if "3070" in name: return 8
    if "3060" in name: return 12
    if "3050" in name: return 6

    if "radeon" in name: return 8
    if "gtx" in name: return 4

    return 2


# -------------------------
# GPU SCORE (for optimizer)
# -------------------------
def get_gpu_score(name):

    name = str(name).lower()

    if "4090" in name: return 200
    if "4080" in name: return 180
    if "4070" in name: return 160
    if "3090" in name: return 170
    if "3080" in name: return 150
    if "3070" in name: return 130
    if "3060" in name: return 110

    if "gtx" in name: return 60
    if "radeon" in name: return 80

    return 30