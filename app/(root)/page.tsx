import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constant/routes";
// import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";
import { title } from "process";
import { de } from "zod/locales";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string}>
}

const questions = [
  {_id: "1", title:"How to learn react?", description: "I am new to react and I want to learn it. Can you help me?", tags: [
    {_id: "1", name: "react"},
    {_id: "2", name: "javascript"},
  ], author: {_id: "1", name: "jhon doe"},
  upvotes: 10,
  answers: 5,
  views: 100,
  createdAd: new Date()
},
  {_id: "2", title:"How to learn javascript?", description: "I am new to javascript and I want to learn it. Can you help me?", tags: [
    {_id: "1", name: "react"},
    {_id: "2", name: "javascript"},
  ], author: {_id: "1", name: "jhon doe"},
  upvotes: 10,
  answers: 5,
  views: 100,
  createdAd: new Date()
},
]


const Home = async ({searchParams}: SearchParams) => {

  const {query = ""} = await searchParams;

  const filteredQuestions = questions.filter((question) => question.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
    <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
      <h1 className="h1-bold text-dark100_light900 ">All Questions</h1>

      <Button className="primary-gradient min-h-11.5 px-4 py-3 !text-light-900" asChild>
        <Link href={ROUTES.ASK_QUESTIONS}>Ask a Question</Link>
      </Button>
    </section>

    <section className="mt-11">
     <LocalSearch route="/" srcImg="/icons/search.svg" placeholder="Search..." otherClasses="flex-1"/>
    </section>
  <div className="mt-10 flex w-full flex-col gap-6">
   {questions.map((question) => (
    <h1 key={question._id}>{question.title}</h1>
   ))}
  </div>

    </>
  );
};

export default Home;
