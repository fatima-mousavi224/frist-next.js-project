import QuestionsForm from '@/components/forms/QuestionsForm'

const page = () => {
  return (
     <>
      <h1 className="h1-bold text-dark100_light900 ">Ask a questions</h1>
      <div className="mt-10">
        <QuestionsForm />
      </div>
    </>
  )
}

export default page
