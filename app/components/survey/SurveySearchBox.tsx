import { useEffect, useRef, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router'
import useSurveyListStore from '~/store/surveyListStore'

const DEBOUNCE_TIME = 500

function SurveySearchBox() {
	const { surveyList, setSurveyListSearched } = useSurveyListStore()
	const location = useLocation()
	const { register, setValue, getValues } = useForm({
		defaultValues: { searchText: '' }
	})
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	const onChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		if (timerRef.current) {
			clearTimeout(timerRef.current)
		}

		timerRef.current = setTimeout(() => {
			setSurveyListSearched(
				surveyList.filter(({ title }) => {
					return title.replace(' ', '').includes(value.replace(' ', ''))
				})
			)
		}, DEBOUNCE_TIME)
	}

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [])

	useEffect(() => {
		if (getValues().searchText) {
			setSurveyListSearched(null)
			setValue('searchText', '')
		}
	}, [location])

	return (
		<input
			className="h-input-h-sm w-[400px] rounded-full bg-gray-800 px-4 placeholder:text-sm"
			placeholder="양식명을 입력하세요"
			{...register('searchText', {
				onChange: onChangeSearchText
			})}
		/>
	)
}

export default SurveySearchBox
