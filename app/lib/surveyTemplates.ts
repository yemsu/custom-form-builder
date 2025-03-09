import { createNewQuestionData } from '~/lib/survey'
import type { SurveyTemplateData } from '~/types/survey'

const emptySurveyTemplate: SurveyTemplateData = {
	id: 'empty',
	title: '제목 없는 설문지',
	description: '설문지 설명',
	questions: [createNewQuestionData()]
}

const contact: SurveyTemplateData = {
	id: 'template1',
	title: '연락처 정보',
	description: '설문지 설명',
	questions: [
		{
			id: 'template1Question1',
			question: '이름',
			type: 'input',
			options: null,
			isRequired: true
		},
		{
			id: 'template1Question2',
			question: '이메일',
			type: 'input',
			options: null,
			isRequired: true
		},
		{
			id: 'template1Question3',
			question: '주소',
			type: 'input',
			options: null,
			isRequired: true
		},
		{
			id: 'template1Question4',
			question: '연락처',
			type: 'input',
			options: null,
			isRequired: false
		}
	]
}

const applyJob: SurveyTemplateData = {
	id: 'template2',
	title: '입사 지원',
	description: '문의 사항은 example@example.com으로 메일 주세요.',
	questions: [
		{
			id: 'template2Question1',
			question: '이름',
			type: 'input',
			options: null,
			isRequired: true
		},
		{
			id: 'template2Question2',
			question: '이메일',
			type: 'input',
			options: null,
			isRequired: true
		},
		{
			id: 'template2Question3',
			question: '전화번호',
			type: 'input',
			options: null,
			isRequired: true
		},
		{
			id: 'template2Question4',
			question: '관심 있는 직책',
			type: 'checkbox',
			options: [
				{ id: 'template2Question4o1', value: '직책 1' },
				{ id: 'template2Question4o2', value: '직책 2' },
				{ id: 'template2Question4o3', value: '직책 3' }
			],
			isRequired: true
		},
		{
			id: 'template2Question5',
			question: '자기소개',
			type: 'textarea',
			options: null,
			isRequired: false
		}
	]
}

const requestShirt: SurveyTemplateData = {
	id: 'template3',
	title: '티셔츠 신청',
	description: '티셔츠를 신청을 위해 이름 및 사이즈를 입력해주세요.',
	questions: [
		{
			id: 'template3Question1',
			question: '이름',
			type: 'input',
			options: null,
			isRequired: true
		},
		{
			id: 'template3Question2',
			question: '티셔츠 사이즈',
			type: 'radio',
			options: [
				{ id: 'template3Question2o1', value: 'S' },
				{ id: 'template3Question2o2', value: 'M' },
				{ id: 'template3Question2o3', value: 'L' }
			],
			isRequired: true
		},
		{
			id: 'template3Question3',
			question: '기타 의견',
			type: 'textarea',
			options: null,
			isRequired: false
		}
	]
}

const surveyTemplates = [emptySurveyTemplate, contact, applyJob, requestShirt]

export default surveyTemplates
