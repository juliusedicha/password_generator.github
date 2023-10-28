import React, { useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [passwordLength, setPasswordLength] = useState(12);
  const [clearConfirmation, setClearConfirmation] = useState(false);

  const generatePassword = () => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecialChars) {
      alert('Please select at least one instruction.');
      return;
    }

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*';
    let selectedChars = '';

    if (includeUppercase) selectedChars += uppercaseChars;
    if (includeLowercase) selectedChars += lowercaseChars;
    if (includeNumbers) selectedChars += numberChars;
    if (includeSpecialChars) selectedChars += specialChars;

    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      newPassword += selectedChars.charAt(Math.floor(Math.random() * selectedChars.length));
    }

    setPassword(newPassword);
    setClearConfirmation(false);
  };

  const clearPassword = () => {
    if (password) {
      setClearConfirmation(true);
    }
  };

  const confirmClear = (confirmed) => {
    if (confirmed) {
      setPassword('');
    }
    setClearConfirmation(false);
  };

  const copyToClipboard = () => {
    if (password) {
      const textArea = document.createElement('textarea');
      textArea.value = password;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      alert('Password copied to clipboard!');
    }
  };

  return (
    <div className="password-generator">
      <h2>Password Generator</h2>
      <label>Password Length:</label>
      <input type="number" value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} />
      <div className="checkbox-list">
        <label>
          <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} /> Uppercase
        </label>
        <label>
          <input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} /> Lowercase
        </label>
        <label>
          <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} /> Numbers
        </label>
        <label>
          <input type="checkbox" checked={includeSpecialChars} onChange={() => setIncludeSpecialChars(!includeSpecialChars)} /> Special Characters
        </label>
      </div>
      <div className="button-container">
        <button onClick={generatePassword}>Generate Password</button>
        {password && <button onClick={clearPassword}>Clear Password</button>}
      </div>
      {password && (
        <div>
          <label>Password Generated:</label>
          <input type="text" value={password} readOnly />
          <span className="copy-icon" onClick={copyToClipboard}>
            📋
          </span>
        </div>
      )}

      {clearConfirmation && (
        <div className="clear-confirmation">
          <p>Do you want to clear the password?</p>
          <button onClick={() => confirmClear(true)}>Yes</button>
          <button onClick={() => confirmClear(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default App;
