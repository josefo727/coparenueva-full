<?php

namespace Tests\Unit\Controllers\Api;

use App\Models\User;
use App\Models\SpecialCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class SpecialCaseControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private User $user;
    private SpecialCase $specialCase;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create($this->getUserCredentials());
        $this->actingAs($this->user);
        $this->specialCase = SpecialCase::factory()->create();
    }

    protected function getUserCredentials()
    {
        return [
            'email' => 'test@example.com',
            'password' => 'password',
        ];
    }

    /** @test */
    public function should_return_special_cases_of_authenticated_user()
    {
        $response = $this->getJson(route('special-cases.index'));

        $response
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonFragment([
                'name' => $this->specialCase->name,
                'email' => $this->specialCase->email,
                'detail' => $this->specialCase->detail,
                'broker_id' => $this->user->id
            ]);
    }

    /** @test */
    public function should_store_new_special_case()
    {
        $data = [
            'name' => 'Test Special Case',
            'email' => 'testspecialcase@example.com',
            'detail' => 'Test detail'
        ];

        $response = $this->postJson(route('special-cases.store'), $data);

        $response
            ->assertCreated()
            ->assertJsonFragment([
                'name' => $data['name'],
                'email' => $data['email'],
                'detail' => $data['detail'],
                'broker_id' => $this->user->id
            ]);

        $this->assertDatabaseHas('special_cases', $data);
    }

    /** @test */
    public function should_show_special_case_of_authenticated_user()
    {
        $response = $this->getJson(route('special-cases.show', $this->specialCase->id));

        $response
            ->assertOk()
            ->assertJsonFragment([
                'name' => $this->specialCase->name,
                'email' => $this->specialCase->email,
                'detail' => $this->specialCase->detail,
                'broker_id' => $this->user->id
            ]);
    }

    /** @test */
    public function should_not_show_special_case_of_another_user()
    {
        $user = User::factory()->create();

        $specialCase = SpecialCase::factory()->create(['broker_id' => $user->id]);

        $response = $this->getJson(route('special-cases.show', $specialCase->id));

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    /** @test */
    public function should_update_special_case_of_authenticated_user()
    {
        $data = [
            'name' => 'Updated Test Special Case',
            'email' => 'updatedtestspecialcase@example.com',
            'detail' => 'Updated test detail'
        ];

        $response = $this->putJson(route('special-cases.update', $this->specialCase->id), $data);

        $response
            ->assertOk()
            ->assertJsonFragment([
                'name' => $data['name'],
                'email' => $data['email'],
                'detail' => $data['detail'],
                'broker_id' => $this->user->id
            ]);

        $this->assertDatabaseHas('special_cases', $data);
    }

    /** @test */
    public function should_delete_a_special_case()
    {
        $specialCase = SpecialCase::factory()->create(['broker_id' => $this->user->id]);

        $response = $this->deleteJson(route('special-cases.destroy', $specialCase));

        $response->assertStatus(Response::HTTP_NO_CONTENT);

        $this->assertModelMissing($specialCase);
    }

}
