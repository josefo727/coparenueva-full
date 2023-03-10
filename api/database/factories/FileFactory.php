<?php

namespace Database\Factories;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kpi>
 */
class FileFactory extends Factory
{
    protected $model = File::class;

    public function definition()
    {
        $path = public_path('storage/files');
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        return [
            'path' => 'files/' . $this->faker->image($path, 640, 480, null, false),
            'fileable_type' => 'App\Models\User', // or any other model type you need
            'fileable_id' => function() {
                return \App\Models\User::factory()->create()->id; // or any other model type you need
            },
            'relationship_type' => $this->faker->word
        ];
    }
}
