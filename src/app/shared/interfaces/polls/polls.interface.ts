export interface IPollRequest {

  pollName: string,
  pollDescription: string,
  createdAt: string,
  expiredAt: string,
  enteredTimes: number,
  questions: IQuestionsInPollResponse

}

export interface IPollResponse extends IPollRequest {
  id: number;
}


export interface IQuestionsInPollRequest {
  questionName: string;

}
export interface IQuestionsInPollResponse extends IQuestionsInPollRequest {
  id: number;
}

