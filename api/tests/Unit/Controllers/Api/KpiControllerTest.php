<?php

namespace Tests\Unit\Controllers\Api;

use App\Models\Kpi;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class KpiControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;
    protected User $normalUser;

    protected function setUp(): void
    {
        parent::setUp();

        $this->adminUser = User::factory()->create($this->getAdminUserCredentials());
        $this->adminUser->is_admin = true;
        $this->adminUser->save();

        $this->normalUser = User::factory()->create($this->getNormalUserCredentials());

        Sanctum::actingAs($this->adminUser);
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
    public function should_list_all_kpis_for_admin()
    {
        Sanctum::actingAs($this->adminUser);

        Kpi::factory()->count(5)->create();

        $response = $this->getJson('/api/kpis');

        $response->assertStatus(200)
            ->assertJsonCount(5);
    }

    /** @test */
    public function should_not_list_kpis_for_user()
    {
        Sanctum::actingAs($this->normalUser);

        Kpi::factory()->count(5)->create([
            'broker_id' => $this->normalUser->id,
        ]);

        $response = $this->getJson('/api/kpis');

        $response->assertStatus(403);
    }

    /** @test */
    public function should_create_kpi_for_admin()
    {
        Sanctum::actingAs($this->adminUser);

        $kpiData = Kpi::factory()->make()->toArray();

        $response = $this->postJson('/api/kpis', $kpiData);

        $response->assertStatus(201)
            ->assertJsonFragment($kpiData);
    }

    /** @test */
    public function should_not_create_kpi_for_user()
    {
        Sanctum::actingAs($this->normalUser);

        $kpiData = Kpi::factory()->make([
            'broker_id' => $this->normalUser->id,
        ])->toArray();

        $response = $this->postJson('/api/kpis', $kpiData);

        $response->assertStatus(403);
    }

    /** @test */
    public function should_show_kpi_detail_for_admin()
    {
        Sanctum::actingAs($this->adminUser);

        $kpi = Kpi::factory()->create();

        $response = $this->getJson("/api/kpis/{$kpi->id}");

        $response->assertStatus(200)
            ->assertJsonFragment($kpi->toArray());
    }

    /** @test */
    public function should_show_own_kpi_detail_for_user()
    {
        Sanctum::actingAs($this->normalUser);

        $kpi = Kpi::factory()->create([
            'broker_id' => $this->normalUser->id,
        ]);

        $response = $this->getJson("/api/kpis/{$kpi->id}");

        $response->assertStatus(200)
            ->assertJsonFragment($kpi->toArray());
    }

    /** @test */
    public function should_update_kpi_for_admin()
    {
        Sanctum::actingAs($this->adminUser);

        $kpi = Kpi::factory()->create();

        $updatedData = Kpi::factory()->make(['broker_id' => $kpi->broker_id])->toArray();

        $response = $this->putJson("/api/kpis/{$kpi->id}", $updatedData);

        $response->assertStatus(200)
            ->assertJsonFragment($updatedData);
    }

    /** @test */
    public function should_not_update_kpi_for_user()
    {
        $kpi = Kpi::factory()->create(['broker_id' => $this->normalUser->id]);

        $response = $this->actingAs($this->normalUser)->putJson(route('kpis.update', $kpi), [
            'renewal_target_audience' => 150,
            'renewed_policies' => 100,
            'renewed_premium' => 10000,
            'incentive_percentage' => 10,
            'canceled_policies' => 5,
        ]);

        $response->assertForbidden();
    }

    /** @test */
    public function should_delete_kpi_if_admin()
    {
        Sanctum::actingAs($this->adminUser);

        $kpi = Kpi::factory()->create([
            'broker_id' => $this->normalUser->id,
        ]);

        $response = $this->deleteJson(route('kpis.destroy', $kpi));

        $response->assertStatus(204);
        $this->assertDatabaseMissing('kpis', ['id' => $kpi->id]);
    }

    /** @test */
    public function should_not_delete_kpi_for_non_admin()
    {
        Sanctum::actingAs($this->normalUser);

        $kpi = Kpi::factory()->create([
            'broker_id' => $this->normalUser->id,
        ]);

        $response = $this->deleteJson(route('kpis.destroy', $kpi));

        $response->assertStatus(403);
        $this->assertDatabaseHas('kpis', ['id' => $kpi->id]);
    }

}
