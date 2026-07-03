import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import CVEditor from './CVEditor'
import type { CVData } from '../App'

const mockCVData: CVData = {
  header: {
    name: 'Arpad Csikos',
    title: 'Senior UI Developer',
  },
  personal: {
    phone: '+36302807143',
    email: 'arpad.csikos@gmail.com',
  },
  skills: [
    { id: 'react', name: 'React.js', progress: 80 },
    { id: 'js', name: 'JavaScript, Ecmascript', progress: 80 },
  ],
  sections: [
    {
      id: 'summary',
      title: 'Summary',
      body: 'Web UI developer with over 15 years of experience',
    },
    {
      id: 'projects',
      title: 'Projects',
      body: 'Built admin dashboards and design system components',
    },
  ],
}

describe('CVEditor', () => {
  it('renders base CV content', () => {
    render(
      <CVEditor 
        cvData={mockCVData} 
        setCVData={() => {}} 
        isSaving={false}
      />
    )

    expect(screen.getByRole('heading', { name: /arpad csikos/i })).toBeInTheDocument()
    expect(screen.getByText(/personal/i)).toBeInTheDocument()
    expect(screen.getByText(/skills/i)).toBeInTheDocument()
  })

  it('renders all CV sections', () => {
    render(
      <CVEditor 
        cvData={mockCVData} 
        setCVData={() => {}} 
        isSaving={false}
      />
    )

    expect(screen.getByDisplayValue('Summary')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Projects')).toBeInTheDocument()
  })

  it('displays header with correct name and title', () => {
    render(
      <CVEditor 
        cvData={mockCVData} 
        setCVData={() => {}} 
        isSaving={false}
      />
    )

    const nameHeading = screen.getByRole('heading', { level: 2, name: /arpad csikos/i })
    expect(nameHeading).toBeInTheDocument()

    const titleHeading = screen.getByRole('heading', { level: 3, name: /senior ui developer/i })
    expect(titleHeading).toBeInTheDocument()
  })
})
