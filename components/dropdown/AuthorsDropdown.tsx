import { getAuthors } from "@/services/api";
import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import { Author } from "@/types";
import Image from "next/image";
import style from "./Dropdown.module.css";
import classNames from "classnames";

type Props = {
  onSelect: (author: Author | null) => void;
  selected: string | null;
};

export default function AuthorsDropdown({ onSelect, selected }: Props) {
  const [isReady, setIsReady] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);
  const [search, setSearch] = useState<string>("");
  const cxAuthorList = classNames(
    "max-h-60 overflow-y-auto flex flex-col border-t border-dark divide-y",
    style["custom-scrollbar"]
  );

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const fetchAuthors = async () => {
      if (authors.length > 0) return;
      const response = [{ id: 0, login: "All" }, ...(await getAuthors())];
      setAuthors(response);
    };
    fetchAuthors();
  }, [isReady]);

  useEffect(() => {
    const filtered = authors.filter((author) =>
      author.login.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredAuthors(filtered);
  }, [search, authors]);

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <div className="p-2">
        <Input placeholder={"Filter Authors"} onChange={handleAuthorChange} />
      </div>
      <div className={cxAuthorList}>
        {filteredAuthors.map((author) => (
          <div
            key={author.id}
            className={classNames("text-white flex items-center px-8 py-2 text-xs gap-2 hover:bg-dark-3 cursor-pointer", {
              "bg-dark-3": selected === author.login,
            })}
            onClick={() => onSelect(author.login === "All" ? null : author)}
          >
            {author.avatar_url ? (
              <Image
                alt={author.login}
                src={author.avatar_url}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <div className="w-4 h-4 rounded-full bg-gray-500"></div>
            )}
            <span>{author.login}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
