import React, { useState } from "react";
import { Collapse, Input } from "antd";

const { Panel } = Collapse;
const { Search } = Input;

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useGetCategoriesQuery();
  const categories = data?.data || [];

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subCategories.some((sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="px-40">
      <h1 className="text-4xl font-bold my-10 text-center">Categories</h1>
      <Search
        placeholder="Search categories or subcategories"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <p className="my-3">
        Total Services:{" "}
        <span className="font-semibold">{categories.length} Items</span>{" "}
        Found
      </p>
      <Collapse accordion>
        {filteredCategories.map((category) => (
          <Panel header={category.name} key={category.id}>
            <p className="text-xl font-semibold border-b-2 pb-2">
              {category.description}
            </p>
            <ul className="my-5 bg-[#f8eeee] p-5 rounded-2xl">
              <h1 className="text-lg font-semibold border-b-2 w-[30%] mb-2">
                Sub - Categories
              </h1>
              {category.subCategories.map((sub, index) => (
                <ul key={index} className="list-disc ml-5">
                  <li>
                    <span className="font-semibold">{sub.name}</span> -{" "}
                    {sub.description}
                  </li>
                </ul>
              ))}
            </ul>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Category;
