import { Categories } from '../components/Categories';
import { HeroBanner } from '../components/HeroBanner';
import { LatestAdd } from '../components/LatestAdd';
import { LeaderBoard } from '../components/LeaderBoard';

function Home() {
  return (
    <div>
      <HeroBanner />
      <Categories />
      <LatestAdd />
      <LeaderBoard />
    </div>
  );
}

export default Home;
