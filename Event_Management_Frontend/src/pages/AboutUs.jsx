import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function AboutUs() {
  const team = [
    {
      name: "Yash Mankumare",
      role: "Team Member",
      img: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      name: "Sanket Mandavgane",
      role: "Team Member",
      img: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      name: "Kalyanee Pachghare",
      role: "Team Member",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <div className="container py-5">

      {/* TOP HEADING */}
      <h1 className="text-center fw-bold mb-4">About EventHub</h1>

      <p className="text-center fs-5 mb-5 text-secondary">
        EventHub helps you create, manage, and participate in events 
        with ease. Whether it's conferences, workshops, or cultural events —  
        our platform brings everything together in one place.
      </p>

      {/* MISSION SECTION */}
      <div className="row align-items-center mb-5">

        <div className="col-md-6 mb-4">
          <img
            src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
            alt="event"
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold mb-3">Our Mission & Values</h2>
          <p className="text-secondary">
            At EventHub, we aim to make event management simpler, modern, 
            and stress-free. From organizing to registering and managing 
            attendees — we make the whole process smooth and enjoyable.
          </p>

          <div className="row mt-4">
            <div className="col-6 mb-3">
              <h4 className="fw-bold">100+ Events</h4>
              <p className="text-secondary small">Managed successfully with great user experience.</p>
            </div>
            <div className="col-6 mb-3">
              <h4 className="fw-bold">3 Team Members</h4>
              <p className="text-secondary small">Worked together to build EventHub end-to-end.</p>
            </div>
            <div className="col-6 mb-3">
              <h4 className="fw-bold">2024</h4>
              <p className="text-secondary small">Developed as a modern academic project.</p>
            </div>
            <div className="col-6 mb-3">
              <h4 className="fw-bold">100% Quality</h4>
              <p className="text-secondary small">Focused on clean UI & smooth functionality.</p>
            </div>
          </div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <h2 className="fw-bold text-center mb-3">Meet Our Team</h2>
      <p className="text-center text-secondary mb-5">
        We worked together to develop the complete frontend & backend
        of EventHub to deliver a smooth event management experience.
      </p>

      <div className="row justify-content-center">
        {team.map((member, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow border-0 p-3">
              <img
                src={member.img}
                alt={member.name}
                className="rounded mb-3"
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h4 className="fw-bold">{member.name}</h4>
              <p className="text-muted">{member.role}</p>

              <p className="small text-secondary">
                Contributed to building and designing the complete EventHub system.
              </p>

              <div className="mt-2">
                <FaFacebook className="mx-2 text-primary" size={20} />
                <FaInstagram className="mx-2 text-danger" size={20} />
                <FaLinkedin className="mx-2 text-primary" size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}