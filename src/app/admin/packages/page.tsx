import Link from "next/link";
import { fetchAllTourPackages } from "../_actions/tours";

const TourPackagePage = async () => {
  const tours = await fetchAllTourPackages()
    .then((data) => data)
    .catch((error) => {
      console.error("Error fetching tour packages:", error);
      return [];
    });

  console.log(tours[0].journeyDates);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Tour Packages</h1>
        <Link className="add-button" href="/admin/packages/add">
          Add New Tour
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Dates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour, idx) => (
            <tr key={idx}>
              <td>{tour.title}</td>
              <td>{tour.days} days</td>
              <td>
                Adult: Rs. {tour.adultPrice}
                <br />
                Child: Rs. {tour.childPrice}
              </td>
              <td>
                {tour.journeyDates?.map((date, i) => (
                  <div key={i}>
                    {date.startDate.toISOString()} to{" "}
                    {date.endDate.toISOString()}
                  </div>
                ))}
              </td>
              <td>
                <button className="btn btn-sm btn-primary mr-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TourPackagePage;
