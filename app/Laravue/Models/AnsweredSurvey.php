<?php

namespace App\Laravue\Models;

use Illuminate\Database\Eloquent\Model;

class AnsweredSurvey extends Model
{
    protected $fillable = [
        'respondent_id', 'result','survey_id'
    ];
    public function user()
    {
        return $this->belongsTo('App\Laravue\Models\User','respondent_id','id');
    }
}
