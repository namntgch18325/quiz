<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Laravue\Models\AnsweredSurvey;
use Illuminate\Support\Arr;
use App\constants;
use App\Http\Resources\SurveyResource;
use App\Http\Resources\SurveyResultResource;
use App\Http\Resources\UserResource;
use App\Laravue\Models\User;
class SurveyResultController extends Controller
{
    const JapanSurveyLanguage =  [
        "answered_surveys.id",
        "respondent_id",
        "survey_id",
        "result",
        "answered_surveys.created_at",
        "answered_surveys.updated_at",
        "users.id as user_id",
        "users.name",
        "surveys.title_ja",
        "surveys.id as survey_id"
    ];
    const EngSurveyLanguage = [
        "answered_surveys.id",
        "respondent_id",
        "survey_id",
        "result",
        "answered_surveys.created_at",
        "answered_surveys.updated_at",
        "users.id as user_id",
        "users.name",
        "surveys.title_en",
        "surveys.id as survey_id"
    ];

    const BothLanguage = [
        "answered_surveys.id",
        "respondent_id",
        "survey_id",
        "result",
        "answered_surveys.created_at",
        "answered_surveys.updated_at",
        "users.id as user_id",
        "users.name",
        "surveys.title_ja",
        "surveys.title_en",
        "surveys.id"
    ];
    public function GetSurveyResult(Request $request)
    {
        $languages = Arr::get($request->all(),'la', '');
        error_log($languages);
        $query = AnsweredSurvey::query();
        $query->join('surveys','surveys.id','=','answered_surveys.survey_id');
        $query->join('users','users.id','=','answered_surveys.respondent_id');
        $result = [];
        if($languages == "en")
        {
            $result = $query->get(static::EngSurveyLanguage);
        }
        else
        if($languages == "ja")
        {
            $result = $query->get(static::JapanSurveyLanguage);
        }
        else {
            error_log("run");
            $query->get(static::BothLanguage);
            return response()->json(["data" => $result],200);
        }
        return SurveyResultResource::collection($result);
    }

    public function GetAllRespondent(Request $request)
    {
        $query = User::query();
        $query->distinct();
        $query->join('answered_surveys','users.id','=','respondent_id');

        $result = $query->get([
            "users.id",
            "name"
        ]);
        UserResource::withoutWrapping();
        return UserResource::collection($result);
    }
}