// // Main.jsx
// import React from 'react';
// import './main.css'; // Import your CSS file for component-specific styles
// import backgroundImage from './home.jpg'; 
// function Main() {
//     const backgroundImageStyle = {
//         backgroundImage: `url(${backgroundImage})`, // Use the imported image
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         height: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: 'white',
//         fontSize: '2rem',
//       };
//   return (
//     <div style={backgroundImageStyle}>
//       <div>
//       <nav className="navbar">
//       <div className="navbar-left">
//         <span className="website-name">Mini Project</span>
//       </div>
//       <div className="navbar-right">
//         <a href="/about" className="nav-link">About</a>
//         <a href="/contact" className="nav-link">Contact</a>
//        <div>
//         <button class="button">Login/signUp</button>
//        </div>
//       </div>
//     </nav>
//       <h1 className="agro">AGROTOURISM</h1>
//       <h5>"Cultivate, Connect, Explore"</h5>
//       <div className="button-container">
//           <button className="button">DISCOVER</button>
//         </div>
//         </div>
        
//       </div>
//   );
// }

// export default Main;


// Main.jsx
import React from 'react';
import './main.css'; // Import your CSS file for component-specific styles
import backgroundImage from './home.jpg';

function Main() {
  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage})`, // Use the imported image
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '2rem',
           animation:'fadeInOut 10s linear infinite'
  };

  return (
    <div style={backgroundImageStyle}>
      <div>
        <nav className="navbar">
          <div className="navbar-left">
            <span className="website-name">Mini Project</span>
          </div>
          <div className="navbar-right">
            <a href="/about" className="nav-link">
              About
            </a>
            <a href="/contact" className="nav-link">
              Contact
            </a>
            <div>
              <button className="btn">Login</button>
            </div>
          </div>
        </nav>
        <h1 className="agro">AGROTOURISM</h1>
        <h5>"Cultivate, Connect, Explore"</h5>
        <div className="button-container">
          <button className="button">DISCOVER</button>
        </div>
      </div>
    </div>
  );
}

export default Main;

