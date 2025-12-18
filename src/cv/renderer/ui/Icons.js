const Icon = ({ children }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const Icons = {
  email: () => (
    <Icon>
      <path d="M4 4h16v16H4z" />
      <path d="M22 6l-10 7L2 6" />
    </Icon>
  ),

  phone: () => (
    <Icon>
      <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1 .37 1.97.7 2.9a2 2 0 0 1-.45 2.11L9.91 11.09a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.45c.93.33 1.9.57 2.9.7a2 2 0 0 1 1.72 2z" />
    </Icon>
  ),

  location: () => (
    <Icon>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  ),

  linkedin: () => (
    <Icon>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Icon>
  ),

  github: () => (
    <Icon>
      <path d="M9 19c-5 1.5-5-2.5-7-3" />
      <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61" />
      <path d="M7 22v-3.87a3.37 3.37 0 0 1 .94-2.61" />
      <path d="M12 2a10 10 0 0 0-3 19.54" />
      <path d="M12 2a10 10 0 0 1 3 19.54" />
    </Icon>
  ),

  twitter: () => (
    <Icon>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.72v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </Icon>
  ),

  website: () => (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Icon>
  )
};

export default Icons;
