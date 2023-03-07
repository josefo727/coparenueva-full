<?php

namespace Tests\Unit\Controllers\Api;

use App\Models\Member;
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
    private Member $member;
    private SpecialCase $specialCase;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create($this->getUserCredentials());
        $this->actingAs($this->user);
        $this->member = Member::factory()->create();
        $this->specialCase = SpecialCase::factory()->create([
            'member_id' => $this->member->id,
            'broker_id' => $this->user->id,
        ]);
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
                'member_id' => $this->specialCase->member_id,
                'name' => $this->specialCase->member->name,
                'email' => $this->specialCase->email,
                'detail' => $this->specialCase->detail,
                'broker_id' => $this->user->id
            ]);
    }

    /** @test */
    public function should_store_new_special_case()
    {
        $data = [
            'member_id' => $this->member->id,
            'email' => 'testspecialcase@example.com',
            'detail' => 'Test detail'
        ];

        $response = $this->postJson(route('special-cases.store'), $data);

        $response
            ->assertCreated()
            ->assertJsonFragment([
                'member_id' => $data['member_id'],
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
                'member_id' => $this->specialCase->member->id,
                'email' => $this->specialCase->email,
                'detail' => $this->specialCase->detail,
                'broker_id' => $this->user->id
            ]);
    }

    /** @test */
    public function should_not_show_special_case_of_another_user()
    {
        $user = User::factory()->create();
        $member = Member::factory()->create(['broker_id' => $user->id]);
        $specialCase = SpecialCase::factory()->create(['member_id' => $member->id]);

        $response = $this->getJson(route('special-cases.show', $specialCase->id));

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    /** @test */
    public function should_update_special_case_of_authenticated_user()
    {
        $data = [
            'member_id' => $this->member->id,
            'email' => 'updatedtestspecialcase@example.com',
            'detail' => 'Updated test detail'
        ];

        $response = $this->putJson(route('special-cases.update', $this->specialCase->id), $data);

        $response
            ->assertOk()
            ->assertJsonFragment([
                'member_id' => $data['member_id'],
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
