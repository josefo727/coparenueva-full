<?php

namespace Tests\Unit\Controllers\Api;

use App\Models\Kpi;
use App\Models\User;
use App\Services\Month;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;
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
    public function should_filter_kpis_by_broker_id_if_admin_provides_a_broker_id()
    {
        Sanctum::actingAs($this->adminUser);

        $adminKpi = Kpi::factory()->create([
            'broker_id' => $this->adminUser->id,
        ]);

        $anotherKpi = Kpi::factory()->create();

        $response = $this->getJson("/api/kpis?brokerId={$anotherKpi->broker_id}");

        $response->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJsonFragment($anotherKpi->toArray())
            ->assertJsonMissing(['id' => $adminKpi->id, 'broker_id' => $adminKpi->broker_id]);
    }

    /** @test */
    public function should_list_kpis_by_user_id_if_not_admin()
    {
        Sanctum::actingAs($this->normalUser);

        $kpi1 = Kpi::factory()->create([
            'broker_id' => $this->normalUser->id,
        ]);

        $user = User::factory()->create();
        $kpi2 = Kpi::factory()->create([
            'broker_id' => $user->id
        ]);

        $response = $this->getJson('/api/kpis');

        $response->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJsonFragment($kpi1->toArray())
            ->assertJsonMissing(['broker_id' => $kpi2->broker_id]);
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
    public function should_update_kpi_for_admin_with_same_month()
    {
        Sanctum::actingAs($this->adminUser);

        $kpi = Kpi::factory()->create(['month' => 'Abril']);

        $updatedData = Kpi::factory()->make([
            'broker_id' => $kpi->broker_id,
            'month' => 'Abril'
        ])->toArray();

        $response = $this->putJson("/api/kpis/{$kpi->id}", $updatedData);

        $response->assertStatus(200)
            ->assertJsonFragment($updatedData);
    }

    /** @test */
    public function should_update_kpi_for_admin_with_different_month()
    {
        Sanctum::actingAs($this->adminUser);

        $monthService = new Month();
        $months = $monthService->getAllMonths();

        $kpi = Kpi::factory()->create(['month' => $months[0]]);

        $updatedData = Kpi::factory()->make([
            'broker_id' => $kpi->broker_id,
            'month' => $months[1]
        ])->toArray();

        $response = $this->putJson("/api/kpis/{$kpi->id}", $updatedData);

        $response->assertStatus(200)
            ->assertJsonFragment($updatedData);
    }

    /** @test */
    public function should_not_update_kpi_if_duplicated_broker_id_and_month()
    {
        Sanctum::actingAs($this->adminUser);

        $kpi1 = Kpi::factory()->create();
        $kpi2 = Kpi::factory()->create();

        $updatedData = [
            'renewal_target_audience' => 150,
            'renewed_policies' => 100,
            'renewed_premium' => 10000,
            'incentive_percentage' => 10,
            'canceled_policies' => 5,
            'month' => $kpi2->month,
            'broker_id' => $kpi2->broker_id,
        ];

        $response = $this->putJson("/api/kpis/{$kpi1->id}", $updatedData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['month']);
    }

    /** @test */
    public function should_not_update_kpi_for_user()
    {
        $kpi = Kpi::factory()->create(['broker_id' => $this->normalUser->id]);

        $monthService = new Month();
        $months = $monthService->getAllMonths();

        $response = $this->actingAs($this->normalUser)->putJson(route('kpis.update', $kpi), [
            'renewal_target_audience' => 150,
            'renewed_policies' => 100,
            'renewed_premium' => 10000,
            'incentive_percentage' => 10,
            'canceled_policies' => 5,
            'month' => Arr::random($months),
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
