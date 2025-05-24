<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Str;

class ImageService
{
    public function saveImage(string $type, $avatarFile)
    {
        return Storage::url($avatarFile->store($type, 'public'));
    }

    public function saveAvatarFromUrl($url)
    {
        $imageContents = file_get_contents($url);
        $avatarPath = 'avatar/' . Str::random(10) . '.jpg';
        Storage::disk('public')->put($avatarPath, $imageContents);

        return 'http://127.0.0.1:8000' . Storage::url($avatarPath);
    }

    public function generateDefaultImage(string $type, $name)
    {
        $typeMap = [
            'avatar' => 'thumbs',
            'workspace' => 'glass',
            'project' => 'shapes',
        ];
        $style = $typeMap[$type];

        return "https://api.dicebear.com/9.x/$style/svg?seed=" . urlencode($name);
    }
}
