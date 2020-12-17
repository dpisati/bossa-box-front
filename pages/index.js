import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";

import Card from "../components/Card";
import Modal from "../components/Modal";
import ConfirmationModal from "../components/ConfirmationModal";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchForTags, setSearchForTags] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [toolSelected, setToolSelected] = useState({});

  const [addModal, setAddModal] = useState(false);
  const [addToolModal, setAddToolModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const [theme, setTheme] = useState("light");

  const saveTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    if(localStorage.getItem("theme") == null) {
      console.log("is null")
      setTheme("light")
    } else {
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("theme")
      );
      setTheme(localStorage.getItem("theme"));
    }
  }, []);

  const switchTheme = () => {
    if (theme === "light") {
      saveTheme("dark");
    } else {
      saveTheme("light");
    }
  };

  async function fetchPosts() {
    // const res = await fetch("http://localhost:3000/tools");
    setIsLoading(true);
    const res = await fetch("https://bossa-box-api.herokuapp.com/tools");
    const data = await res.json();
    await setPosts(data);
    await setIsLoading(false);
    setToolSelected({});
  }

  async function fetchFilteredPosts() {
    if (!searchForTags) {
      // const res = await fetch(`http://localhost:3000/tools?q=${searchInput}`);
      const res = await fetch(
        `https://bossa-box-api.herokuapp.com/tools?q=${searchInput}`
      );
      const data = await res.json();
      setPosts(data);
    } else {
      const res = await fetch(
        // `http://localhost:3000/tools?tags_like=${searchInput}`
        `https://bossa-box-api.herokuapp.com/tools?tags_like=${searchInput}`
      );
      const data = await res.json();
      setPosts(data);
    }
  }

  function handleAddPost() {
    setAddModal(true);
    setAddToolModal(true);
  }

  function handleCloseModal() {
    setAddModal(false);
    setAddToolModal(false);
    setConfirmationModal(false);
    setToolSelected({});
  }

  function handleSelectPost(content) {
    setToolSelected(content);
    setAddModal(true);
    setConfirmationModal(true);
  }

  function handleUpdatePost(content) {
    setToolSelected(content);
    setAddModal(true);
    setAddToolModal(true);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchFilteredPosts(), 500);
    return () => clearTimeout(timeoutId);
  }, [searchInput, searchForTags]);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>VUTTR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${addModal && styles.modalIsOpen}`}>
        <div className={styles.topHeader}>
          <div className={styles.switchContainer}>
            <div className={styles.test}>
              <label id="switch" className={styles.switch123}>
                <input
                  // value={theme}
                  checked={theme === "light" ? true : false}
                  defaultChecked={theme === "light" ? true : false}
                  type="checkbox"
                  onChange={switchTheme}
                  className={styles.slider123}
                />
                <span
                  className={`${styles.slider321} ${styles.round123}`}
                ></span>
              </label>
            </div>
            <button className={styles.addButtonMobile} onClick={handleAddPost}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="61.414"
                height="61.42"
                viewBox="0 0 61.414 61.42"
                style={{
                  fill: "none",
                  stroke: "white",
                  strokeMiterlimit: 10,
                  strokeWidth: "10px",
                  transform: "rotate(45deg)",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "transparent",
                }}
              >
                <defs></defs>
                <g transform="translate(-568.793 -714.793)">
                  <path
                    className="a"
                    d="M80,20.005l-60,60m60,0L20,20"
                    transform="translate(549.501 695.5)"
                  />
                </g>
              </svg>
              <label className={styles.addLabel}>Add</label>
            </button>
          </div>

          <h1 className={styles.title}>VUTTR</h1>
          <h2 className={styles.subtitle}>Very Useful Tools to Remember</h2>

          {/* <button className={styles.themeSwitcher} onClick={switchTheme}>
            Theme
          </button> */}

          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.searchInputContiner}>
                <svg
                  className={styles.searchIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 47.707 47.707"
                  style={{
                    fill: "none",
                    stroke: "#170c3a",
                    strokeMiterlimit: 10,
                    strokeWidth: "3px",
                    width: "18px",
                    height: "18px",
                  }}
                >
                  <defs></defs>
                  <g transform="translate(-1272 -1799)">
                    <path
                      className="a"
                      d="M39.049,39.049,56,56"
                      transform="translate(1263 1790)"
                    />
                    <circle
                      className="a"
                      cx="17"
                      cy="17"
                      r="17"
                      transform="translate(1273 1800)"
                    />
                  </g>
                </svg>
                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                ></input>
              </div>
              <div className={styles.searchInputTagContainer}>
                <input
                  type="checkbox"
                  value={searchForTags}
                  onChange={() => setSearchForTags(!searchForTags)}
                />
                <label className={styles.searchLabel}>
                  search in tags only
                </label>
              </div>
            </div>

            <button className={styles.addButton} onClick={handleAddPost}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="61.414"
                height="61.42"
                viewBox="0 0 61.414 61.42"
                style={{
                  fill: "none",
                  stroke: "#FFFFFF",
                  strokeMiterlimit: 10,
                  strokeWidth: "10px",
                  transform: "rotate(45deg)",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "transparent",
                }}
              >
                <defs></defs>
                <g transform="translate(-568.793 -714.793)">
                  <path
                    d="M80,20.005l-60,60m60,0L20,20"
                    transform="translate(549.501 695.5)"
                  />
                </g>
              </svg>
              <label className={styles.addLabel}>Add</label>
            </button>
          </div>
        </div>

        <div className={styles.bodyContent}>
          {!posts.length == 0 &&
            !isLoading &&
            posts.map((post) => {
              return (
                <Card
                  key={post.id}
                  content={post}
                  onDelete={fetchPosts}
                  setToolSelected={handleSelectPost}
                  updatePost={handleUpdatePost}
                />
              );
            })}

          {isLoading && (
            <div className={styles.noPosts}>
              <div className={styles.spinner}>
                <h2 className={styles.loading}>Loading...</h2>
                <Image
                  src="/spinner.gif"
                  alt="Not Found"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          )}
          {posts.length == 0 && !isLoading && (
            <div className={styles.noPosts}>
              <div className={styles.noPostsImg}>
                <Image
                  src="/notfound.gif"
                  alt="Not Found"
                  width={200}
                  height={200}
                />
                <h2 className={styles.notFound}>Ooops, no posts found...</h2>
              </div>
            </div>
          )}
        </div>

        {addToolModal && (
          <Modal
            setAddModal={handleCloseModal}
            addModal={addModal}
            fetchPosts={fetchPosts}
            tool={toolSelected}
          />
        )}

        {toolSelected && confirmationModal && (
          <ConfirmationModal
            setAddModal={handleCloseModal}
            fetchPosts={fetchPosts}
            tool={toolSelected}
          />
        )}
      </main>
    </div>
  );
}
