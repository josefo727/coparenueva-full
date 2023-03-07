<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kpis', function (Blueprint $table) {
            $table->id();
            $table->integer('renewal_target_audience');
            $table->integer('renewed_policies');
            $table->integer('renewed_premium');
            $table->float('incentive_percentage', 5, 2);
            $table->integer('canceled_policies');
            $table->unsignedBigInteger('broker_id');
            $table->foreign('broker_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kpis');
    }
};
