import React, { useState } from 'react';
import Header from '../components/Header';
import '../css/footer.css';

function SubmitArticle() {
  const [formData, setFormData] = useState({
    articleInfo: {
      title: '',
      abstract: '',
      manuscriptType: '',
      wordCount: '',
      referenceCount: '',
    },
    authors: [
      {
        firstName: '',
        lastName: '',
        email: '',
        affiliation: '',
      },
    ],
    keywords: [],
    classification: '',
    files: {
      manuscript: null,
    },
    compliance: {
      plagiarism: false,
      ethicalApproval: false,
      conflictOfInterest: false,
      fundingDisclosure: '',
    },
  });

  const [step, setStep] = useState('articleInfo');
  const [stepErrors, setStepErrors] = useState({});

  const validateStep = (step) => {
    const stepErrors = {};
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validateWordCount = (count) => {
      const num = parseInt(count);
      return !isNaN(num) && num > 0 && num < 100000;
    };

    switch (step) {
      case 'articleInfo':
        if (!formData.articleInfo.title) {
          stepErrors.title = 'Title is required';
        } else if (formData.articleInfo.title.length < 10) {
          stepErrors.title = 'Title must be at least 10 characters';
        }

        if (!formData.articleInfo.abstract) {
          stepErrors.abstract = 'Abstract is required';
        } else if (formData.articleInfo.abstract.length < 150) {
          stepErrors.abstract = 'Abstract must be at least 150 characters';
        }

        if (!formData.articleInfo.manuscriptType) {
          stepErrors.manuscriptType = 'Manuscript type is required';
        }

        if (!formData.articleInfo.wordCount) {
          stepErrors.wordCount = 'Word count is required';
        } else if (!validateWordCount(formData.articleInfo.wordCount)) {
          stepErrors.wordCount = 'Please enter a valid word count (1-99,999)';
        }

        if (!formData.articleInfo.referenceCount) {
          stepErrors.referenceCount = 'Reference count is required';
        } else if (parseInt(formData.articleInfo.referenceCount) < 10) {
          stepErrors.referenceCount = 'Minimum 10 references required';
        }
        break;

      case 'authors':
        formData.authors.forEach((author, index) => {
          const prefix = `author${index + 1}`;
          if (!author.firstName) {
            stepErrors[`${prefix}FirstName`] = 'First name is required';
          }
          if (!author.lastName) {
            stepErrors[`${prefix}LastName`] = 'Last name is required';
          }
          if (!author.email) {
            stepErrors[`${prefix}Email`] = 'Email is required';
          } else if (!validateEmail(author.email)) {
            stepErrors[`${prefix}Email`] = 'Please enter a valid email address';
          }
          if (!author.affiliation) {
            stepErrors[`${prefix}Affiliation`] = 'Affiliation is required';
          }
        });
        break;

      case 'keywords':
        if (formData.keywords.length < 3) {
          stepErrors.keywords = 'Please add at least 3 keywords';
        }
        if (!formData.classification) {
          stepErrors.classification = 'Classification is required';
        }
        break;

      case 'files':
        if (!formData.files.manuscript) {
          stepErrors.manuscript = 'Manuscript file is required';
        } else if (formData.files.manuscript.size > 10000000) {
          stepErrors.manuscript = 'File size must not exceed 10MB';
        }
        break;

      case 'compliance':
        if (!formData.compliance.plagiarism) {
          stepErrors.plagiarism = 'Plagiarism declaration is required';
        }
        if (!formData.compliance.ethicalApproval) {
          stepErrors.ethicalApproval = 'Ethical approval declaration is required';
        }
        if (!formData.compliance.conflictOfInterest) {
          stepErrors.conflictOfInterest = 'Conflict of interest declaration is required';
        }
        if (!formData.compliance.fundingDisclosure) {
          stepErrors.fundingDisclosure = 'Funding disclosure is required';
        }
        break;

      default:
        break;
    }
    setStepErrors(stepErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateStep(step);
    if (Object.keys(stepErrors).length === 0) {
      // Submit the form data
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="submission-container">
      <Header />
      <div className="submission-form">
        <h1 className="text-3xl font-bold mb-8">Submit Your Manuscript</h1>
        
        {/* Step Navigation */}
        <div className="step-navigation mb-8">
          <div className={step === 'articleInfo' ? 'step active' : 'step'}>
            <span>1</span>
            <span>Article Information</span>
          </div>
          <div className={step === 'authors' ? 'step active' : 'step'}>
            <span>2</span>
            <span>Authors</span>
          </div>
          <div className={step === 'keywords' ? 'step active' : 'step'}>
            <span>3</span>
            <span>Keywords & Classification</span>
          </div>
          <div className={step === 'files' ? 'step active' : 'step'}>
            <span>4</span>
            <span>Upload Files</span>
          </div>
          <div className={step === 'compliance' ? 'step active' : 'step'}>
            <span>5</span>
            <span>Compliance & Declaration</span>
          </div>
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 'articleInfo' && (
            <div className="step-content">
              <h2>Article Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label>Title</label>
                  <input
                    type="text"
                    value={formData.articleInfo.title}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      articleInfo: { ...prev.articleInfo, title: e.target.value }
                    }))}
                    className="w-full p-2 border rounded"
                  />
                  {stepErrors.title && <p className="text-red-500">{stepErrors.title}</p>}
                </div>
                <div>
                  <label>Abstract</label>
                  <textarea
                    value={formData.articleInfo.abstract}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      articleInfo: { ...prev.articleInfo, abstract: e.target.value }
                    }))}
                    className="w-full p-2 border rounded"
                    rows="4"
                  />
                  {stepErrors.abstract && <p className="text-red-500">{stepErrors.abstract}</p>}
                </div>
                <div>
                  <label>Manuscript Type</label>
                  <select
                    value={formData.articleInfo.manuscriptType}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      articleInfo: { ...prev.articleInfo, manuscriptType: e.target.value }
                    }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select type</option>
                    <option value="original">Original Research</option>
                    <option value="review">Review Article</option>
                    <option value="case">Case Report</option>
                  </select>
                  {stepErrors.manuscriptType && <p className="text-red-500">{stepErrors.manuscriptType}</p>}
                </div>
                <div>
                  <label>Word Count</label>
                  <input
                    type="number"
                    value={formData.articleInfo.wordCount}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      articleInfo: { ...prev.articleInfo, wordCount: e.target.value }
                    }))}
                    className="w-full p-2 border rounded"
                  />
                  {stepErrors.wordCount && <p className="text-red-500">{stepErrors.wordCount}</p>}
                </div>
                <div>
                  <label>Reference Count</label>
                  <input
                    type="number"
                    value={formData.articleInfo.referenceCount}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      articleInfo: { ...prev.articleInfo, referenceCount: e.target.value }
                    }))}
                    className="w-full p-2 border rounded"
                  />
                  {stepErrors.referenceCount && <p className="text-red-500">{stepErrors.referenceCount}</p>}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setStep('authors')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 'authors' && (
            <div className="step-content">
              <h2>Authors</h2>
              <div className="space-y-4">
                {formData.authors.map((author, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label>First Name</label>
                      <input
                        type="text"
                        value={author.firstName}
                        onChange={(e) => setFormData(prev => {
                          const newAuthors = [...prev.authors];
                          newAuthors[index] = { ...newAuthors[index], firstName: e.target.value };
                          return { ...prev, authors: newAuthors };
                        })}
                        className="w-full p-2 border rounded"
                      />
                      {stepErrors[`author${index + 1}FirstName`] && <p className="text-red-500">{stepErrors[`author${index + 1}FirstName`]}</p>}
                    </div>
                    <div>
                      <label>Last Name</label>
                      <input
                        type="text"
                        value={author.lastName}
                        onChange={(e) => setFormData(prev => {
                          const newAuthors = [...prev.authors];
                          newAuthors[index] = { ...newAuthors[index], lastName: e.target.value };
                          return { ...prev, authors: newAuthors };
                        })}
                        className="w-full p-2 border rounded"
                      />
                      {stepErrors[`author${index + 1}LastName`] && <p className="text-red-500">{stepErrors[`author${index + 1}LastName`]}</p>}
                    </div>
                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        value={author.email}
                        onChange={(e) => setFormData(prev => {
                          const newAuthors = [...prev.authors];
                          newAuthors[index] = { ...newAuthors[index], email: e.target.value };
                          return { ...prev, authors: newAuthors };
                        })}
                        className="w-full p-2 border rounded"
                      />
                      {stepErrors[`author${index + 1}Email`] && <p className="text-red-500">{stepErrors[`author${index + 1}Email`]}</p>}
                    </div>
                    <div>
                      <label>Affiliation</label>
                      <input
                        type="text"
                        value={author.affiliation}
                        onChange={(e) => setFormData(prev => {
                          const newAuthors = [...prev.authors];
                          newAuthors[index] = { ...newAuthors[index], affiliation: e.target.value };
                          return { ...prev, authors: newAuthors };
                        })}
                        className="w-full p-2 border rounded"
                      />
                      {stepErrors[`author${index + 1}Affiliation`] && <p className="text-red-500">{stepErrors[`author${index + 1}Affiliation`]}</p>}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    authors: [...prev.authors, { firstName: '', lastName: '', email: '', affiliation: '' }]
                  }))}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Add Another Author
                </button>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setStep('articleInfo')}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setStep('keywords')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 'keywords' && (
            <div className="step-content">
              <h2>Keywords & Classification</h2>
              <div className="space-y-4">
                <div>
                  <label>Keywords</label>
                  <div className="flex flex-wrap gap-2">
                    {formData.keywords.map((keyword, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                        {keyword}
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            keywords: prev.keywords.filter((_, i) => i !== index)
                          }))}
                          className="ml-1 text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add keyword..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          setFormData(prev => ({
                            ...prev,
                            keywords: [...prev.keywords, e.target.value.trim()]
                          }));
                          e.target.value = '';
                        }
                      }}
                      className="border rounded p-1"
                    />
                  </div>
                  {stepErrors.keywords && <p className="text-red-500">{stepErrors.keywords}</p>}
                </div>
                <div>
                  <label>Classification</label>
                  <select
                    value={formData.classification}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      classification: e.target.value
                    }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select classification</option>
                    <option value="neuroscience">Neuroscience</option>
                    <option value="neurology">Neurology</option>
                    <option value="psychiatry">Psychiatry</option>
                  </select>
                  {stepErrors.classification && <p className="text-red-500">{stepErrors.classification}</p>}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setStep('authors')}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setStep('files')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 'files' && (
            <div className="step-content">
              <h2>Upload Files</h2>
              <div className="space-y-4">
                <div>
                  <label>Manuscript File</label>
                  <input
                    type="file"
                    accept=".doc,.docx,.pdf"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      files: { ...prev.files, manuscript: e.target.files[0] }
                    }))}
                    className="w-full p-2 border rounded"
                  />
                  {stepErrors.manuscript && <p className="text-red-500">{stepErrors.manuscript}</p>}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setStep('keywords')}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setStep('compliance')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 'compliance' && (
            <div className="step-content">
              <h2>Compliance & Declaration</h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.compliance.plagiarism}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        compliance: { ...prev.compliance, plagiarism: e.target.checked }
                      }))}
                      className="mr-2"
                    />
                    <span>I declare that this work is original and has not been published elsewhere</span>
                  </label>
                  {stepErrors.plagiarism && <p className="text-red-500">{stepErrors.plagiarism}</p>}
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.compliance.ethicalApproval}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        compliance: { ...prev.compliance, ethicalApproval: e.target.checked }
                      }))}
                      className="mr-2"
                    />
                    <span>I have obtained all necessary ethical approvals</span>
                  </label>
                  {stepErrors.ethicalApproval && <p className="text-red-500">{stepErrors.ethicalApproval}</p>}
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.compliance.conflictOfInterest}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        compliance: { ...prev.compliance, conflictOfInterest: e.target.checked }
                      }))}
                      className="mr-2"
                    />
                    <span>I declare that there are no conflicts of interest</span>
                  </label>
                  {stepErrors.conflictOfInterest && <p className="text-red-500">{stepErrors.conflictOfInterest}</p>}
                </div>
                <div>
                  <label>Funding Disclosure</label>
                  <textarea
                    value={formData.compliance.fundingDisclosure}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      compliance: { ...prev.compliance, fundingDisclosure: e.target.value }
                    }))}
                    className="w-full p-2 border rounded"
                    rows="4"
                    placeholder="Please disclose any funding sources..."
                  />
                  {stepErrors.fundingDisclosure && <p className="text-red-500">{stepErrors.fundingDisclosure}</p>}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setStep('files')}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit Manuscript
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SubmitArticle;
