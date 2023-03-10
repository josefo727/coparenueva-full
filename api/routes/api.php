<?php

use App\Http\Controllers\Api\AcceptTermsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\UserTermController;
use App\Http\Controllers\Api\SpecialCaseController;
use App\Http\Controllers\Api\KpiController;
use App\Http\Controllers\Api\BrokerKpiController;
use App\Http\Controllers\Api\MonthController;
use App\Http\Controllers\Api\MyTeamController;
use App\Http\Controllers\Api\UserIncentiveTableController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login'])->name('login');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('users', UserController::class);
    Route::get('user-term', [UserTermController::class, 'show'])->name('user-term.show');
    Route::get('broker-kpi', [BrokerKpiController::class, 'show'])->name('broker-kpi.show');
    Route::put('user-term', [UserTermController::class, 'update'])->name('user-term.update');
    Route::put('accept-terms', [AcceptTermsController::class, 'update'])->name('accept-terms.update');
    Route::get('user-incentive-table', [UserIncentiveTableController::class, 'show'])->name('user-incentive-table.show');
    Route::put('user-incentive-table', [UserIncentiveTableController::class, 'update'])->name('user-incentive-table.update');
    Route::apiResource('members', MemberController::class);
    Route::get('my-team', [MyTeamController::class, 'index']);
    Route::apiResource('special-cases', SpecialCaseController::class);
    Route::apiResource('kpis', KpiController::class);
    Route::get('kpis-user/{id}', [KpiController::class, 'kpisUser']);
    Route::get('months', [MonthController::class, 'index'])->name('months.index');
});
