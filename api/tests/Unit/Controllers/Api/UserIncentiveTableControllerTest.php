<?php

namespace Tests\Unit\Controllers\Api;

use App\Models\File;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UserIncentiveTableControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected User $adminUser;
    protected User $normalUser;

    protected function setUp(): void
    {
        parent::setUp();

        $this->adminUser = User::factory()->create($this->getAdminUserCredentials());
        $this->adminUser->is_admin = true;
        $this->adminUser->save();

        $this->normalUser = User::factory()->create($this->getNormalUserCredentials());
    }

    protected function getAdminUserCredentials()
    {
        return [
            'email' => 'test.admin@example.com',
            'password' => 'password',
        ];
    }

    protected function getNormalUserCredentials()
    {
        return [
            'email' => 'test@example.com',
            'password' => 'password',
        ];
    }

    /** @test */
    public function should_return_incentive_table_url_for_authenticated_user_with_incentive_table_file_in_show_method()
    {
        Storage::fake();
        $file = UploadedFile::fake()->image('incentive_table.jpg');
        $path = $file->store('incentive-tables');
        $user = User::factory()->create();
        $file = new File([
            'path' => $path,
            'relationship_type' => 'incentive_table',
            'relationship_id' => $user->id
        ]);
        $user->incentiveTable()->save($file);

        $response = $this->actingAs($user)->getJson(route('user-incentive-table.show'));

        $response->assertOk()->assertJson(['url' => Storage::url($path)]);
    }

    /** @test */
    public function should_show_returns_null_for_authenticated_user_without_incentive_table_file()
    {
        $response = $this->actingAs($this->normalUser)->getJson(route('user-incentive-table.show'));

        $response->assertOk()->assertJson(['url' => null]);
    }

    /** @test */
    public function should_update_returns_error_when_file_is_not_image()
    {
        $user = $this->adminUser;
        $file = UploadedFile::fake()->create('document.pdf');

        $response = $this->actingAs($user)->putJson(route('user-incentive-table.update'), [
            'image' => $file,
            'userId' => $user->id,
        ]);

        $response->assertStatus(Response::HTTP_BAD_REQUEST)->assertJson(['error' => 'El archivo debe ser una imagen válida.']);
    }

    /** @test */
    public function should_update_deletes_existing_file_and_creates_new_file_for_authenticated_user_admin()
    {
        $this->actingAs($this->adminUser);

        $existingFile = File::factory()->create([
            'relationship_type' => 'incentive_table',
            'fileable_id' => $this->normalUser->id,
        ]);

        Storage::fake();
        $image = UploadedFile::fake()->image('incentive-table.jpg');
        $response = $this->putJson(route('user-incentive-table.update'), [
            'image' => $image,
            'userId' => $this->normalUser->id,
        ]);

        $response->assertSuccessful();
        Storage::assertMissing($existingFile->path);
        Storage::disk('public')->assertExists('incentive-tables/' . $image->hashName());
        $this->assertDatabaseHas('files', [
            'relationship_type' => 'incentive_table',
            'fileable_id' => $this->normalUser->id,
        ]);
    }
}
