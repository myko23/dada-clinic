import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./SearchInput.css";

const SearchInput = ({ className, searchfield, setSearchfield }) => {
	return (
		<div className={"searchinput " + (className || "")}>
			<FontAwesomeIcon className="searchinput__icon " icon={faSearch} />
			<input
				type="text"
				className="fit searchinput__input"
				value={searchfield}
				onChange={(e) => setSearchfield(e.target.value)}
			/>
		</div>
	);
};

export default SearchInput;
