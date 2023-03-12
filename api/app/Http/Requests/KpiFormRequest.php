<?php

namespace App\Http\Requests;

use App\Services\Month;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class KpiFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $monthService = new Month();
        $months = $monthService->getAllMonths();
        $rules = [
            'renewal_target_audience' => ['required', 'integer'],
            'renewed_policies' => ['required', 'integer'],
            'renewed_premium' => ['required', 'integer'],
            'incentive_percentage' => ['required', 'numeric'],
            'canceled_policies' => ['required', 'integer'],
            'month' => ['required', function ($attribute, $value, $fail) use ($months) {
                if (!in_array($value, $months)) {
                    $fail($attribute.' is invalid.');
                }
            },],
        ];

        if ($this->isMethod('PUT')) {
            $id = $this->route('kpi')->id;
            $rules['month'] = ['required', function ($attribute, $value, $fail) use ($months) {
                if (!in_array($value, $months)) {
                    $fail($attribute.' is invalid.');
                }
            },Rule::unique('kpis')->where(function ($query) use ($id) {
                return $query->where('month', $this->month)
                    ->where('broker_id', $this->broker_id)
                    ->where('id', '!=', $id);
            })];
        }

        if ($this->isMethod('POST')) {
            $rules['broker_id'] = ['required', 'exists:users,id'];
        }

        return $rules;
    }
}
