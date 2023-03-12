<?php

namespace App\Services;

class Month
{
    public function getAllMonths()
    {
        $months = config('months');

        $allMonths = [];

        foreach ($months as $award) {
            $allMonths = array_merge($allMonths, $award);
        }

        return array_unique($allMonths);
    }

    public function getAwards()
    {
        $months = config('months');
        $awards = [];

        foreach ($months as $award => $monthsList) {
            if (is_array($monthsList)) {
                $awards[$award] = implode(' - ', $monthsList);
            }
        }

        return $awards;
    }

    public function getAllOptions()
    {
        $options = [];

        $allMonths = $this->getAllMonths();
        foreach ($allMonths as $month) {
            $options[] = [
                'value' => $month,
                'label' => $month,
            ];
        }

        $awards = $this->getAwards();
        foreach ($awards as $award => $months) {
            $options[] = [
                'value' => $award,
                'label' => $months,
            ];
        }

        return [
            'months' => $allMonths,
            'all_options' => $options,
        ];
    }

    function getMonthsByValue($value)
    {
        $options = config('months');

        $matchingMonths = collect($options)->map(function ($option, $key) use ($value) {
            return $key === $value
                ? $option
                : collect($option)->filter(function ($month) use ($value) {
                    return strpos($month, $value) !== false;
                })->toArray();
        })->filter(function ($months) {
            return !empty($months);
        })->flatten()->unique()->toArray();

        return $matchingMonths;
    }

}
