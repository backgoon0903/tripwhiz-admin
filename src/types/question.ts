
export interface IQuestionImage {
  uploadFileNames: string; //기존 파일명을 나타내는 문자열 타입
  ord: number; //순서
}

export type QuestionStatus = '답변완료' | '답변대기';

export type QnaCategory = 'APP' | '환불' | '픽업' | '매장' | '영수증';

export interface IQuestion {
  qno: number; //질문 번호
  title: string; //제목
  writer: string; //작성자
  category: QnaCategory;
  createdDate: string; //작성일
  qcontent: string; //질문 내용
  status: QuestionStatus;
  images?: IQuestionImage[];
  del_flag: boolean; //삭제 플래그
  is_public: boolean //공개 여부
  viewCount: number //조회수
}