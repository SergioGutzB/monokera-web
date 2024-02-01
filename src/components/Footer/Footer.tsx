const MainFooter = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <hr className="my-6 border-text-text-light sm:mx-auto lg:my-8" />
        <span className="block text-sm text-text-dark sm:text-center">
          © 2024{' '}
          <a href="#" className="hover:underline">
            Monokera
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default MainFooter;
