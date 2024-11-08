<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'José R. Gutierrez',
            'email' => 'josefo727@gmail.com',
            'password' => bcrypt('000000'),
            'is_admin' => true,
        ]);
    }
}
