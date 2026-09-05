import React from 'react';
import { SEOHead } from '../common/SEOHead';
import { Link } from '../../utils/router';
import { Shield, FileText, AlertCircle } from 'lucide-react';

interface LegalPageProps {
  pageType: 'privacy' | 'terms' | 'disclaimer';
}

export const LegalPages: React.FC<LegalPageProps> = ({ pageType }) => {
  if (pageType === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SEOHead
          title="Privacy Policy"
          description="Read QuickSolve's privacy policy. Learn how our client-side architecture keeps your calculations and data completely private."
          canonicalPath="/privacy-policy"
        />

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-500 mt-1">Last Updated: January 1, 2025</p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
            <p>
              Welcome to <strong>QuickSolve</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Platform&rdquo;). We are fiercely committed to user privacy. Unlike traditional web services that collect and store user queries on remote servers, QuickSolve is engineered as a <strong>client-side first platform</strong>.
            </p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
              1. Information We Do Not Collect
            </h2>
            <p>
              When you use our 46 calculations, converters, developer tools, or image processors:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Financial Inputs:</strong> Salary numbers, loan principals, interest rates, and split-bill totals never leave your browser.</li>
              <li><strong>Student Records:</strong> Course names, grades, GPA calculations, and attendance numbers are processed in local memory.</li>
              <li><strong>Images &amp; Documents:</strong> Uploaded images are compressed, resized, and converted locally using the browser's Canvas API. No image files are ever uploaded or transmitted to any server.</li>
              <li><strong>Text &amp; Code:</strong> JSON payloads, regex strings, and text snippets are formatted and evaluated strictly on your client machine.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
              2. Local Storage Usage
            </h2>
            <p>
              We utilize browser <code>localStorage</code> solely for your personal convenience:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Saving your color scheme preference (Light Mode / Dark Mode).</li>
              <li>Keeping a list of your most recently accessed tools so you can reopen them quickly on the homepage.</li>
            </ul>
            <p>You may clear your browser cache or cookies at any time to purge this local storage.</p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
              3. Analytics &amp; Advertisements
            </h2>
            <p>
              We may display non-intrusive advertisements or aggregate performance analytics to maintain server operations. Third-party advertising vendors (such as Google AdSense) may use cookies to serve ads based on prior visits. You can opt out of personalized advertising by visiting Google&rsquo;s Ads Settings.
            </p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
              4. Contact Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, please reach out via our{' '}
              <Link to="/contact" className="text-blue-600 dark:text-blue-400 underline">
                Contact Page
              </Link>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (pageType === 'terms') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SEOHead
          title="Terms of Service"
          description="Read the QuickSolve terms of service governing the use of our free calculators and online tools."
          canonicalPath="/terms"
        />

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Terms of Service
              </h1>
              <p className="text-xs text-slate-500 mt-1">Last Updated: January 1, 2025</p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
            <p>
              By accessing or using QuickSolve, you acknowledge and agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, you should discontinue use immediately.
            </p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
              1. Permitted Use
            </h2>
            <p>
              QuickSolve provides 100% free utilities for personal, educational, and business productivity. You may use our calculators, text processors, and converters without payment or registration.
            </p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
              2. Intellectual Property
            </h2>
            <p>
              The design, layouts, custom algorithms, branding, and styling of QuickSolve are protected by applicable copyright and intellectual property laws. You retain all ownership rights to any text or images you process through our client tools.
            </p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
              3. Disclaimer of Warranties
            </h2>
            <p>
              All tools and calculators are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied.
            </p>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
              4. Limitation of Liability
            </h2>
            <p>
              Under no circumstances shall QuickSolve or its operators be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the calculations or tools provided.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Disclaimer
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead
        title="Disclaimer"
        description="Important legal, financial, and educational disclaimer regarding calculations on QuickSolve."
        canonicalPath="/disclaimer"
      />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Disclaimer
            </h1>
            <p className="text-xs text-slate-500 mt-1">Last Updated: January 1, 2025</p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
          <p>
            The information, mathematical formulas, and calculations provided on <strong>QuickSolve</strong> are created for educational, informational, and personal productivity purposes only.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
            Financial Calculations
          </h2>
          <p>
            The financial calculators (including Percentage, Loan EMI, Compound Interest, Salary, and Profit/Loss) are simulations based on standard mathematical principles. Actual bank terms, loan amortization schedules, tax withholdings, and commercial rates vary by jurisdiction, lender, and individual creditworthiness. You should always consult with a licensed financial advisor or certified accountant before making substantial financial commitments.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
            Educational &amp; Academic Grading
          </h2>
          <p>
            The GPA, CGPA, and grade calculators employ standard US and international 4.0 weighted scales. Your specific educational institution or university may employ custom grade thresholds, honors point weights, or unique semester conventions. Please consult your academic registrar for official degree audits.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
            Software &amp; Image Processing
          </h2>
          <p>
            Image compression, format conversion, and code formatting are performed client-side. We recommend retaining original backup copies of critical images and files prior to batch modification.
          </p>
        </div>
      </div>
    </div>
  );
};
