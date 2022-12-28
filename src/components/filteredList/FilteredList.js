import { useContext } from "react";
import "./filteredList.scss";
import { MetricContext } from "../../context/context";
import redYellow from "../../assets/red-yellow.png";

const FilteredList = (props) => {
  const searchTerm = props.searchTerm;
  const selectedTags = props.selectedTags;
  const { Data } = useContext(MetricContext);
  const results = props.results;
  const games = props.games;

  return (
    <div>
      {games
        .filter((val) => {
          if (searchTerm === "") return val;
          else if (
            val.app_name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        })
        .map((game, key) => {
          return (
            <div key={key} className="container">
              <h1>{game.app_name}</h1>

              <table className="tableContainer">
                <tr>
                  {selectedTags.map((tag, index) => (
                    <th key={index}>{tag}</th>
                  ))}
                </tr>
                {results?.data.map((result, index) => (
                  <tbody>
                    {result.app_id === game.app_id ? (
                      <tr key={index}>
                        {games.map((game, index) => (
                          <>
                            {result.app_id === game.app_id ? (
                              <>
                                {Data.map((tag, index) => (
                                  <>
                                    {tag.tagName === "Name" &&
                                    tag.visibleState ? (
                                      <td key={index} className="redYellow">
                                        <img src={redYellow} alt="app_image" />
                                        {game.app_name}
                                      </td>
                                    ) : null}
                                  </>
                                ))}
                              </>
                            ) : null}
                          </>
                        ))}
                        {Data.map((tag, index) =>
                          tag.tagName === "Date" && tag.visibleState ? (
                            <td key={index}>{result.date}</td>
                          ) : null
                        )}
                        {Data.map((tag, index) =>
                          tag.tagName === "App" && tag.visibleState ? (
                            <td key={index}>{result.app_id}</td>
                          ) : null
                        )}
                        {Data.map((tag, index) =>
                          tag.tagName === "Clicks" && tag.visibleState ? (
                            <td key={index}>{result.clicks}</td>
                          ) : null
                        )}
                        {Data.map((tag, index) =>
                          tag.tagName === "Ad Requests" && tag.visibleState ? (
                            <td key={index}>{result.requests}</td>
                          ) : null
                        )}
                        {Data.map((tag, index) =>
                          tag.tagName === "Ad Response" && tag.visibleState ? (
                            <td key={index}>{result.responses}</td>
                          ) : null
                        )}
                        {Data.map((tag, index) =>
                          tag.tagName === "Impression" && tag.visibleState ? (
                            <td key={index}>{result.impressions}</td>
                          ) : null
                        )}
                        {Data.map((tag, index) =>
                          tag.tagName === "Revenue" && tag.visibleState ? (
                            <td key={index}>{result.revenue}</td>
                          ) : null
                        )}
                        {Data.map((tag, index) =>
                          tag.tagName === "Fill Rate" && tag.visibleState ? (
                            <td key={index}>
                              {(result.requests / result.responses) * 100}%
                            </td>
                          ) : null
                        )}
                        {Data.map((tag, index) =>
                          tag.tagName === "CTR" && tag.visibleState ? (
                            <td key={index}>
                              {(result.clicks / result.impressions) * 100}%
                            </td>
                          ) : null
                        )}
                      </tr>
                    ) : null}
                  </tbody>
                ))}
              </table>
            </div>
          );
        })}
    </div>
  );
};

export default FilteredList;
