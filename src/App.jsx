import { useState, useEffect } from 'react';
import { db, auth } from './firebaseConfig';
import { doc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

function App() {
  const [stars, setStars] = useState(0);
  const [previousStars, setPreviousStars] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const coinSound = new Audio('/coin.wav');
  const powerupSound = new Audio('/powerup.wav');

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    
    try {
      await signInWithEmailAndPassword(auth, 'goodboy@tracker.app', password);
      setIsAuthenticated(true);
    } catch (error) {
      setAuthError('Incorrect password. Try again!');
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const unsub = onSnapshot(doc(db, "good_boy_tracker", "january_2026"), (doc) => {
      const newCount = doc.data()?.count || 0;
      
      if (newCount >= 10 && previousStars < 10) {
        powerupSound.play();
      } else if (newCount >= 50 && previousStars < 50) {
        powerupSound.play();
      }
      
      setPreviousStars(newCount);
      setStars(newCount);
    });
    return () => unsub();
  }, [previousStars, isAuthenticated]);

  const addStar = async () => {
    coinSound.play();
    await updateDoc(doc(db, "good_boy_tracker", "january_2026"), {
      count: increment(1)
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', paddingTop: '100px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', paddingTop: '50px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Gold Star Collector</h1>
        <form onSubmit={handleLogin}>
          <div className="nes-field" style={{ marginTop: '20px' }}>
            <label htmlFor="password_field">Enter Password:</label>
            <input 
              type="password" 
              id="password_field" 
              className="nes-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter shared password"
              autoFocus
            />
          </div>
          {authError && (
            <p style={{ color: '#e76e55', marginTop: '10px', fontSize: '14px' }}>{authError}</p>
          )}
          <button type="submit" className="nes-btn is-primary" style={{ width: '100%', marginTop: '20px' }}>
            LOGIN
          </button>
        </form>
        <div className="nes-balloon from-left" style={{ marginTop: '20px' }}>
          <p>Psst! Ask Mom or Dad for the password!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '14px' }}>
        <p>{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button 
          type="button" 
          className="nes-btn is-error" 
          style={{ fontSize: '12px', padding: '5px 10px' }}
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div className="nes-balloon from-left">
          <p>Let's-a go! Get those stars!</p>
        </div>
      </div>

      <section className="nes-container is-rounded" style={{ marginTop: '20px', textAlign: 'center', backgroundColor: 'white' }}>
        <h1><i className="nes-icon star is-large"></i> x {stars}</h1>
      </section>

      <button 
        type="button" 
        className="nes-btn is-warning" 
        style={{ width: '100%', marginTop: '20px', height: '80px', fontSize: '24px' }}
        onClick={addStar}
      >
        ADD STAR +
      </button>

      <div style={{ marginTop: '20px' }}>
        <p>{currentMonth} Progress:</p>
        <progress className="nes-progress is-success" value={Math.min(stars, daysInMonth)} max={daysInMonth}></progress>
        <p style={{ textAlign: 'center', fontSize: '12px', marginTop: '5px' }}>{stars} / {daysInMonth} days</p>
        {stars >= daysInMonth && <p style={{ textAlign: 'center', marginTop: '10px' }}>Month Complete!</p>}
      </div>
    </div>
  );
}

export default App;

