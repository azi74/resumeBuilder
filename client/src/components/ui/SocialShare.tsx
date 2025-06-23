import { useState } from 'react'
import { FiShare2, FiX, FiCopy, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'

const SocialShare = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const currentUrl = window.location.href

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      '_blank'
    )
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
      '_blank'
    )
  }

  const shareViaEmail = () => {
    window.open(
      `mailto:?body=${encodeURIComponent(`Check out this resume: ${currentUrl}`)}`,
      '_blank'
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-violet-600 hover:text-violet-800"
      >
        <FiShare2 className="mr-1" />
        Share
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
          <div className="p-2">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-500"
            >
              <FiX size={18} />
            </button>
            
            <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
              Share this resume
            </div>
            
            <div className="py-1">
              <button
                onClick={copyToClipboard}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiCopy className="mr-2" />
                {copied ? 'Copied!' : 'Copy link'}
              </button>
              
              <button
                onClick={shareOnLinkedIn}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiLinkedin className="mr-2" />
                Share on LinkedIn
              </button>
              
              <button
                onClick={shareOnTwitter}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiTwitter className="mr-2" />
                Share on Twitter
              </button>
              
              <button
                onClick={shareViaEmail}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiMail className="mr-2" />
                Share via Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SocialShare