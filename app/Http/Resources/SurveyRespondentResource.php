<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Laravue\Models\AnsweredSurvey;
use App\constants;
class SurveyRespondentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $result = AnsweredSurvey::where('respondent_id',$this->user_id)->where('survey_id',$this->survey_id)->get('result');
        $rs = 0;
        if(!empty($result[0]['result']) && $result != null) $rs = -1;

        if(empty($this->survey_complete_message))
        {
            if(empty($this->survey_title_en))
            {
                return [
                    constants::SURVEY['KEY_ID'] => $this->survey_id,
                    constants::SURVEY['KEY_TITLE'] => $this->survey_title,
                    constants::SURVEY['KEY_STATUS'] => $this->survey_status,
                    constants::SURVEY['KEY_RESULT'] => $rs
                ];
            }
            else 
            return [
                "survey_id" => $this->survey_id,
                "survey_title_ja" => $this->survey_title_ja,
                "survey_title_en" => $this->survey_title_en,
                "survey_status" => $this->survey_status,
                "survey_result" => $rs
            ];
        }

        return [
            constants::SURVEY['KEY_ID'] => $this->id,
            constants::SURVEY['KEY_TITLE'] => $this->survey_title,
            constants::SURVEY['KEY_STATUS'] => $this->survey_status,
            constants::SURVEY['KEY_COMPLETE_MESSAGE'] => $this->survey_complete_message,
            constants::SURVEY['KEY_CORRECT_PICTURE'] => $this->survey_correct_picture,
            constants::SURVEY['KEY_INCORRECT_PICTURE'] => $this->survey_incorrect_picture,
            constants::SURVEY["KEY_RESULT"] => $rs,
            "quizzes" => QuizResource::collection($this->quizzes),
        ];
    }
}
