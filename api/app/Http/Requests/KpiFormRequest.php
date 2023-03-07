<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
        $rules = [
            'renewal_target_audience' => ['required', 'integer'],
            'renewed_policies' => ['required', 'integer'],
            'renewed_premium' => ['required', 'integer'],
            'incentive_percentage' => ['required', 'numeric'],
            'canceled_policies' => ['required', 'integer'],
        ];

        if ($this->isMethod('POST')) {
            $rules['broker_id'] = ['required', 'exists:users,id'];
        }

        return $rules;
    }
}
