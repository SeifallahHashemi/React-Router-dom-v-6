import BooksList from "../components/Books/BooksList.js";
import book_1 from "../img/Book 2.jpg";
import book_2 from "../img/Book 3.jpg";
import book_3 from "../img/Book 4.jpg";
import book_4 from "../img/Book 5.jpg";

import classes from './Home.module.css';
// import book_5 from "../img/Book 6.jpg";
export const DUMMY_DATA = [
  {
    id: 'post_1',
    title: "کتاب اول",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
    url: book_1,
  },
  {
    id: 'post_2',
    title: "کتاب دوم",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
    url: book_2,
  },
  {
    id: 'post_3',
    title: "کتاب دوم",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
    url: book_3,
  },
  {
    id: 'post_4',
    title: "کتاب دوم",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
    url: book_4,
  },
];
const Home = () => {
  return (
    <ul className={classes.bookListItem}>
      {DUMMY_DATA.map((book) => (
        <BooksList
          key={book.id.toString()}
          url={book.url}
          title={book.title}
          id={book.id}
          content={book.content}
        />
      ))}
    </ul>
  );
};
export default Home;
