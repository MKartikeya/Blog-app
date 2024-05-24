import styles from './footer.module.css';


const Footer = () => {
  return (
    <div className=" mt-auto w-[100%] z-0">
      <div className="mt-8 w-full bg-[#0a0a0b] px-8 md:px-[300px] flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8 bottom-0 ">
        <div className="flex flex-col text-white">
          <p className={styles.footerfont}>Featured Blogs</p>
          <p className={styles.footerfont}>Most viewed</p>
          <p className={styles.footerfont}>Readers Choice</p>
        </div>

        <div className="flex flex-col text-white">
          <p className={styles.footerfont}>Forum</p>
          <p className={styles.footerfont}>Support</p>
          <p className={styles.footerfont}>Recent Posts</p>
        </div>

        <div className="flex flex-col text-white">
          <p className={styles.footerfont}>Privacy Policy</p>
          <p className={styles.footerfont}>About Us</p>
          <p className={styles.footerfont}>Terms & Conditions</p>
          <p className={styles.footerfont}>Terms of Service</p>
        </div>
      </div >
      <p className={`"py-2 pb-3 text-center bg-[#0a0a0b] text-sm" ${styles.footerfont} `}>All rights reserved @BlogHub 2024</p>
    </div>

  )
}

export default Footer