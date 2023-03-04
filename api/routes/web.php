<?php

use App\Http\Controllers\WebInit;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function() {
    $api_info = [
        'title' => 'Copa Renueva REST API',
        'description' => 'API para acceder a los datos de la Copa Renueva',
    ];

    return response()->json($api_info, 200);
});

Route::get('/web-init', WebInit::class);
