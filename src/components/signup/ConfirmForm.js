import Button from "../ui/Button";

const ConfirmForm = ({ handlePreviousFormStage, handleSetup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    handleSetup();
  };

  return (
    <form className="px-1" onSubmit={handleSubmit}>
      <h1 className="text-2xl text-gray-600 font-bold mb-6">
        Confirm & finish set up
      </h1>

      <Button
        type={"button"}
        variant={"dark"}
        className={"w-full py-4 mb-3"}
        onClick={handlePreviousFormStage}
      >
        Go back
      </Button>

      <Button
        type={"submit"}
        variant={"primary"}
        className={"w-full py-4"}
        // disabled={!isFormValid || checkRasppberry?.status === "fail"}
        onClick={handleSubmit}
      >
        Finish
      </Button>
    </form>
  );
};

export default ConfirmForm;
