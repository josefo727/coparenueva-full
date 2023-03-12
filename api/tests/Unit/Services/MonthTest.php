<?php

namespace Tests\Unit\Services;

use App\Services\Month;
use Tests\TestCase;

class MonthTest extends TestCase
{
    /** @test */
    public function should_return_all_months()
    {
        $expected = [
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
        ];
        $monthService = new Month();

        $this->assertEquals($expected, $monthService->getAllMonths());
    }

    /** @test */
    public function should_get_awards_returns_correct_award_names()
    {
        $monthService = new Month();
        $expected = [
            'award_1' => 'Abril - Mayo - Junio',
            'award_2' => 'Julio - Agosto - Septiembre - Octubre',
        ];

        $actual = $monthService->getAwards();

        $this->assertEquals($expected, $actual);
    }

    /** @test */
    public function should_get_all_options_returns_all_months_and_awards_as_options()
    {
        $service = new Month();
        $options = $service->getAllOptions();

        $expected = [
            'months' => [
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
            ],
            'all_options' => [
                ["value" => "Abril", "label" => "Abril"],
                ["value" => "Mayo", "label" => "Mayo"],
                ["value" => "Junio", "label" => "Junio"],
                ["value" => "Julio", "label" => "Julio"],
                ["value" => "Agosto", "label" => "Agosto"],
                ["value" => "Septiembre", "label" => "Septiembre"],
                ["value" => "Octubre", "label" => "Octubre"],
                ["value" => "award_1", "label" => "Abril - Mayo - Junio"],
                ["value" => "award_2", "label" => "Julio - Agosto - Septiembre - Octubre"],
            ],
        ];

        foreach ($options as $item) {
            $this->assertIsArray($item);
        }

        $this->assertSame($expected, $options);
    }

    /** @test */
    public function should_return_an_empty_array_if_value_does_not_exist()
    {
        $input = 'Diciembre';
        $array = config('months');

        $result = app(Month::class)->getMonthsByValue($input, $array);
        $this->assertEmpty($result);
    }

    /** @test */
    public function should_return_array_of_month_if_value_exists_in_award_1()
    {
        $input = 'Junio';
        $array = config('months');

        $result = app(Month::class)->getMonthsByValue($input, $array);
        $this->assertEquals(['Junio'], $result);
    }

    /** @test */
    public function should_return_array_of_month_if_value_exists_in_award_2()
    {
        $input = 'Agosto';
        $array = config('months');

        $result = app(Month::class)->getMonthsByValue($input, $array);
        $this->assertEquals(['Agosto'], $result);
    }

    /** @test */
    public function should_return_award_2_value()
    {
        $array = config('months');

        $value = 'award_2';
        $result = app(Month::class)->getMonthsByValue($value);

        $this->assertSame($array['award_2'], $result);
    }
}
