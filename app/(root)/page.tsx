import QuestionCard from '@/components/cards/QuestionCard';
import HomeFilter from '@/components/filters/HomeFilter';
import LocalSearch from '@/components/search/LocalSearch';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constant/routes';
// import { SearchParams } from "next/dist/server/request/search-params";
import Link from 'next/link';
import { title } from 'process';
import { de } from 'zod/locales';

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const questions = [
  {
    _id: '1',
    title: 'How to learn react?',
    description: 'I am new to react and I want to learn it. Can you help me?',
    tags: [
      { _id: '1', name: 'react' },
      { _id: '2', name: 'javascript' },
    ],
    author: {
      _id: '1',
      name: 'jhon doe',
      image:
        'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_wordcount_boost&w=740&q=80',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: '2',
    title: 'How to learn javascript?',
    description: 'I am new to javascript and I want to learn it. Can you help me?',
    tags: [
      { _id: '1', name: 'react' },
      { _id: '2', name: 'javascript' },
    ],
    author: {
      _id: '1',
      name: 'jhon doe',
      image:
        'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_wordcount_boost&w=740&q=80',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];

const Home = async ({ searchParams }: SearchParams) => {
  const { query = '', filter = '' } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title.toLowerCase().includes(query.toLowerCase());

    if (filter === 'react') {
      return matchesQuery && question.tags.some((tag) => tag.name === 'react');
    }

    if (filter === 'javascript') {
      return matchesQuery && question.tags.some((tag) => tag.name === 'javascript');
    }

    if (filter === 'newest') {
      return matchesQuery && question.createdAt !== undefined && question.createdAt >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Last 7 days
    }

    if (filter === 'popular') {
      return matchesQuery && question.upvotes > 5; // Example threshold for popularity
    }

    if (filter === 'unanswered') {
      return matchesQuery && question.answers === 0;
    }

    if (filter === 'recommended') {
      return matchesQuery && question.upvotes > 10; // Example threshold for recommendation
    }

    return matchesQuery;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900 ">All Questions</h1>

        <Button className="primary-gradient min-h-11.5 px-4 py-3 !text-light-900" asChild>
          <Link href={ROUTES.ASK_QUESTIONS}>Ask a Question</Link>
        </Button>
      </section>

      <section className="mt-11">
        <LocalSearch
          route="/"
          srcImg="/icons/search.svg"
          placeholder="Search..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
